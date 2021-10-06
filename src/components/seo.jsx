import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../favicon.png";

const Seo = () => {
  return (
    <Helmet>
      <title>Weather app</title>
      <link rel="icon" href={favicon} type="image/png" />
    </Helmet>
  );
};

export default Seo;
