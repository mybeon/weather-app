import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "./seo";

const LoadingWeather = () => {
  return (
    <main>
      <Seo />
      <div className="weather_container">
        <div className="upper_section">
          <span className="loading-dash"></span>
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
        <div className="down_section"></div>
      </div>
    </main>
  );
};

export default LoadingWeather;
