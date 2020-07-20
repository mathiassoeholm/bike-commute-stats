import React from "react";
import { SummaryActivity } from "../models/strava";

interface IProps {
  activities: SummaryActivity[];
}

const Home: React.FC<IProps> = ({ activities }) => {
  const commuteActivites = activities.filter((a) => a.commute);

  return <h1>Number of commutes: {commuteActivites.length}</h1>;
};

export { Home };
