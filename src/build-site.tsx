import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { Home } from "./site/home";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
import { MongoClient } from "mongodb";

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

    const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
      method: "POST",
      body: params,
    });

    const { access_token, refresh_token } = await response.json();

    await collection.updateOne(
      { _id },
      { $set: { refreshToken: refresh_token } }
    );

    const html = ReactDOMServer.renderToString(<Home />);

    if (!existsSync("./build")) {
      mkdirSync("build");
    }
    writeFileSync("./build/index.html", html);
  } finally {
    client.close();
  }
})();
