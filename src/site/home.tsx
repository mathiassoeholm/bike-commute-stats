/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { SummaryActivity } from "../models/strava";

interface IProps {
  activities: SummaryActivity[];
}

const Home: React.FC<IProps> = ({ activities }) => {
  const commuteActivites = activities.filter((a) => a.commute);

  return (
    <div
      css={css(`
        color: red;
      `)}
    >
      <h1>Number of commutes: {commuteActivites.length}</h1>
    </div>
  );
};

export { Home };
