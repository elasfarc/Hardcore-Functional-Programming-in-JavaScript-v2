const R = require("ramda");
const { Task } = require("./types");
const API_KEY = "51933d4d6ec32ec8ff83127c2015c9d2";

const makeUrl = (zip) =>
  `https://tranquil-depths-60651.herokuapp.com/api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`;

const chainTask = (fn) => (task) => R.invoker(1, "chain")(fn)(task);

const fetchIt = (url) => Task.of(fetch(url));
const parseIt = (response) =>
  Task((rej, res) =>
    R.compose(
      R.otherwise(rej),
      R.andThen(res),
      R.andThen(R.invoker(0, "json"))
    )(response)
  );

const getWeatherData = R.compose(chainTask(parseIt), fetchIt, makeUrl, R.trim);
module.exports = { getWeatherData };

/*

const R = require("ramda");
const { Task } = require("./types");
const API_KEY = "51933d4d6ec32ec8ff83127c2015c9d2";

const makeUrl = (zip) =>
  `https://tranquil-depths-60651.herokuapp.com/api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`;

const fetchToTask = (url) =>
  Task((rej, res) =>
    R.compose(
      R.otherwise(rej),
      R.andThen(res),
      R.andThen(R.invoker(0, "json")),
      fetch
    )(url)
  );

const getWeather = R.compose(fetchToTask, makeUrl, R.trim);

module.exports = { getWeather };

*/
