const R = require("ramda");

const convertK2F = R.compose(
  R.add(32),
  R.multiply(9 / 5),
  R.subtract(R.__, 273.15)
);
const prepareWeather = ({
  name,
  main: {
    feels_like: feelsLike,
    humidity,
    temp: now,
    temp_max: max,
    temp_min: min,
  },
  sys: { country },
} = {}) =>
  R.modify(
    "temp",
    R.map(convertK2F)
  )({
    name,
    country,
    temp: { feelsLike, now, max, min, humidity },
  });

module.exports = { prepareWeather };
