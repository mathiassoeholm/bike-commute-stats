import React from "react";
import ReactDOM from "react-dom";
import { Home } from "../site/home";
import { SummaryActivity } from "../models/strava";

const activites: SummaryActivity[] = [
  {
    distance: 10000,
    commute: true,
  },
  {
    distance: 40000,
    commute: true,
  },
  {
    distance: 20000,
    commute: true,
  },
];

ReactDOM.render(
  <Home activities={activites} />,
  document.getElementById("root")
);
