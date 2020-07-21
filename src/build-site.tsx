import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { Home } from "./site/home";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
import { MongoClient } from "mongodb";
import { Helmet } from "react-helmet";
import { SummaryActivity } from "./models/strava";

require("dotenv").config();

(async () => {
  const {
    STRAVA_CLIENT_ID,
    STRAVA_CLIENT_SECRET,
    MONGODB_PASSWORD,
    MONGODB_DB,
    MONGODB_COLLECTION,
  } = process.env;

  if (
    !STRAVA_CLIENT_ID ||
    !STRAVA_CLIENT_SECRET ||
    !MONGODB_PASSWORD ||
    !MONGODB_DB ||
    !MONGODB_COLLECTION
  ) {
    throw new Error("Some of the required environment variables were not set");
  }

  const uri = `mongodb+srv://admin:${MONGODB_PASSWORD}@cluster0-1mz6n.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true });
  try {
    await client.connect();

    const collection = client.db(MONGODB_DB).collection(MONGODB_COLLECTION);
    const { _id, refreshToken } = (await collection.findOne({})) as any;

    const params = new URLSearchParams();
    params.append("client_id", STRAVA_CLIENT_ID);
    params.append("client_secret", STRAVA_CLIENT_SECRET);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const tokenResponse = await fetch(
      "https://www.strava.com/api/v3/oauth/token",
      {
        method: "POST",
        body: params,
      }
    );

    const { access_token, refresh_token } = await tokenResponse.json();

    await collection.updateOne(
      { _id },
      { $set: { refreshToken: refresh_token } }
    );

    const activitiesPerPage = 200;
    let page = 1;
    let allActivites: SummaryActivity[] = [];

    while (true) {
      const activitiesResponse = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=${activitiesPerPage}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const activities: SummaryActivity[] = await activitiesResponse.json();

      if (!activities?.length) {
        break;
      }

      allActivites = [...allActivites, ...activities.filter((a) => a.commute)];

      page++;
    }

    const reactHtmlOutput = ReactDOMServer.renderToString(
      <Home activities={allActivites} />
    );

    const helmet = Helmet.renderStatic();

    const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            ${reactHtmlOutput}
        </body>
    </html>
`;

    if (!existsSync("./build")) {
      mkdirSync("build");
    }
    writeFileSync("./build/index.html", html);
  } finally {
    client.close();
  }
})();
