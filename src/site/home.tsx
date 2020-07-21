/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { Helmet } from "react-helmet";
import { SummaryActivity } from "../models/strava";

interface IProps {
  activities: SummaryActivity[];
}

const Home: React.FC<IProps> = ({ activities }) => {
  const commuteActivites = activities.filter((a) => a.commute);

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
        <h1>Number of commutes: {commuteActivites.length}</h1>
      </div>
    </React.Fragment>
  );
};

export { Home };
