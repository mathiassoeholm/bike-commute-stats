import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { Home } from "./site/home";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

require("dotenv").config();

(async () => {
  const {
    STRAVA_CLIENT_ID,
    STRAVA_REFRESH_TOKEN,
    STRAVA_CLIENT_SECRET,
  } = process.env;

  if (!STRAVA_CLIENT_ID || !STRAVA_REFRESH_TOKEN || !STRAVA_CLIENT_SECRET) {
    throw new Error("Some of the required environment variables were not set");
  }

  const params = new URLSearchParams();
  params.append("client_id", STRAVA_CLIENT_ID);
  params.append("client_secret", STRAVA_CLIENT_SECRET);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", STRAVA_REFRESH_TOKEN);

  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    body: params,
  });

  const accessToken = (await response.json()).access_token;

  const html = ReactDOMServer.renderToString(<Home />);

  if (!existsSync("./build")) {
    mkdirSync("build");
  }
  writeFileSync("./build/index.html", html);
})();
