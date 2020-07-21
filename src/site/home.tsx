/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { Helmet } from "react-helmet";
import { SummaryActivity } from "../models/strava";

interface IProps {
  activities: SummaryActivity[];
}

const CO2_KILOGRAMS_PER_KILOMETER = 0.21;

const Home: React.FC<IProps> = ({ activities }) => {
  const commuteActivites = activities.filter((a) => a.commute);
  const totalKilometers = commuteActivites.reduce(
    (acc, activity) => acc + activity.distance / 1000,
    0
  );

  const totalCO2Kg = totalKilometers * CO2_KILOGRAMS_PER_KILOMETER;

  return (
    <React.Fragment>
      <Helmet>
        <title>Mathias bikes to work</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div
        css={css(`
        font-family: 'Heebo', sans-serif;
      `)}
      >
        <p>BY BIKING TO WORK, MATHIAS HAS SAVED</p>
        <h1>
          {Math.round(totalCO2Kg * 100) / 100} kg CO
          <span
            css={css(`
              display: inline-block;
              font-size: 0.6em;
              transform: translateY(0.2em);
            `)}
          >
            2
          </span>
        </h1>
      </div>
    </React.Fragment>
  );
};

export { Home };
