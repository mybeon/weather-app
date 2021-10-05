import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import LoadingWeather from "../components/loadingWeather";
import TodayList from "../components/todayList";
import WeekList from "../components/weekList";
import { StaticImage } from "gatsby-plugin-image";
import "../scss/main.scss";
import "../scss/tabs.scss";

const IndexPage = () => {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };
        apiFetch(position);
      },
      function (err) {
        setErrors((arr) => [...arr, err.message]);
      }
    );
  }, []);

  function apiFetch(position) {
    let apiKey = process.env.API_KEY;
    let baseUrl = process.env.BASE_URL;
    let urlCity = `${baseUrl}weather?lat=${position.lat}&lon=${position.long}&appid=${apiKey}`;
    let urlWeather = `${baseUrl}onecall?lat=${position.lat}&lon=${position.long}&exclude=minutely&appid=${apiKey}&units=metric`;
    Promise.all([
      fetch(urlWeather).then((res) => res.json()),
      fetch(urlCity).then((res) => res.json()),
    ])
      .then((temps) => setData(temps))
      .catch(() =>
        setErrors((arr) => [
          ...arr,
          "something went wrong, please try in a whiles",
        ])
      );
  }
  if (errors.length > 0) {
    return (
      <main>
        <p className="errors">{errors[0]}</p>
      </main>
    );
  }
  if (data === null) return <LoadingWeather />;
  const { current, hourly, daily } = data[0];
  let time = new Date(current.dt * 1000);
  let day = days[time.getDay()];
  let date = time.getDate();
  let month = months[time.getMonth()];
  let hour = time.getHours();
  let minute =
    time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
  let dayTime = `${day}, ${date} ${month} ${hour}:${minute}`;
  console.log(time.getMinutes());
  return (
    <main>
      <div className="weather_container">
        <div className="upper_section">
          <h2>
            {data[1].name}, {data[1].sys.country}
          </h2>
          <span>{dayTime}</span>
          <span className="temperature">
            {Math.round(current.temp)}
            <span className="degree">°</span>
          </span>
          <span>humidity {current.humidity}%</span>
          <span className="description">{current.weather[0].description}</span>
          <img
            src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt="weather-img"
          />

          <StaticImage
            className="wave"
            src="../images/wave1.svg"
            alt=""
            placeholder="tracedSVG"
          />
          <StaticImage
            className="wave"
            src="../images/wave2.svg"
            alt=""
            placeholder="tracedSVG"
          />
        </div>
        <div className="down_section">
          <Tabs>
            <TabList>
              <Tab>today</Tab>
              <Tab>this week</Tab>
            </TabList>
            <TabPanel>
              <TodayList hourly={hourly} />
            </TabPanel>
            <TabPanel>
              <WeekList daily={daily} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
