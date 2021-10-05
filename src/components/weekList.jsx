import React from "react";

const WeekList = ({ daily }) => {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <ul className="weather-list">
      {daily.map((day) => {
        let time = new Date(day.dt * 1000);
        let tempDay = days[time.getDay()];
        return (
          <li key={day.dt}>
            <span>{day.dt === daily[0].dt ? "today" : tempDay}</span>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <span>{Math.round(day.temp.day)}°</span>
            <span className="min_temp">{Math.round(day.temp.night)}°</span>
          </li>
        );
      })}
    </ul>
  );
};

export default WeekList;
