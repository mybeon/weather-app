const fetch = require("node-fetch");

exports.handler = async (event) => {
  let { lat, long } = JSON.parse(event.body);
  let apiKey = process.env.API_KEY;
  let baseUrl = process.env.BASE_URL;
  let urlCity = `${baseUrl}weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  let urlWeather = `${baseUrl}onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${apiKey}&units=metric`;

  const hanlde = Promise.all([
    fetch(urlWeather).then((res) => res.json()),
    fetch(urlCity).then((res) => res.json()),
  ])
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    })
    .catch((err) => {
      error = {
        errorMessage: err,
      };
      return {
        statusCode: 200,
        body: JSON.stringify(error),
      };
    });

  return hanlde;
};
