const R = require("ramda");
const { getWeatherData } = require("./open_weather");
const { prepareWeather } = require("./weather");

toLi = ([k, v]) => `<li>${k} : ${v}</li>`;
const toWeatherCard = ({ name, country, temp }) => `
<div>
    <p> ${name}, ${country} </p>
    <ul>
      ${R.into("", R.map(toLi), Object.entries(temp))}
    </ul>
</div>
`;
const getWeather = R.compose(
  R.invoker(1, "map")(toWeatherCard),
  R.invoker(1, "map")(prepareWeather),
  getWeatherData
);
/////////////////////////////////////////

const app = () => {
  var zipInput = document.getElementById("zip");
  var goBtn = document.getElementById("go");
  var result = document.getElementById("weather");
  goBtn.addEventListener("click", () => {
    R.compose(
      R.invoker(2, "fork")(console.error, (html) => (result.innerHTML = html)),
      getWeather
    )(zipInput.value);
  });
};

app();
