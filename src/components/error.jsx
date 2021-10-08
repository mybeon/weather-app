import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "./seo";
const ErrorWeather = ({ errors }) => {
  return (
    <main>
      <Seo />
      <div className="weather_container">
        <div className="upper_section">
          <div className="errors">
            <Seo />
            <h3>{errors.length > 1 ? "errors:" : "error:"}</h3>
            <p>
              {errors.map((err) => {
                return <span className="text_error">- {err}</span>;
              })}
            </p>
          </div>
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

export default ErrorWeather;
