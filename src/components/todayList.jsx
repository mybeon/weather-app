import React from "react";

const TodayList = ({ hourly }) => {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return (
    <ul className="weather-list">
      {hourly.map((hour) => {
        let time = new Date(hour.dt * 1000);
        let tempHour = time.getHours();
        let tempDay = days[time.getDay()];
        return (
          <li key={hour.dt}>
            <span>
              {hour.dt === hourly[0].dt
                ? "now"
                : tempHour === 0
                ? tempDay
                : tempHour + ":00"}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
            />
            <span>{Math.round(hour.temp)}°</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TodayList;
