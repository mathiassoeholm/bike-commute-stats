import React from "react";
import ReactDOM from "react-dom";
import { Home } from "../site/home";
import { SummaryActivity } from "../models/strava";

const activites: SummaryActivity[] = [
  {
    distance: 10,
    commute: true,
  },
];

ReactDOM.render(
  <Home activities={activites} />,
  document.getElementById("root")
);
