import React from "react";
import ReactDOMServer from "react-dom/server";
import { Home } from "./site/home";
import { writeFileSync, mkdirSync, existsSync } from "fs";

const html = ReactDOMServer.renderToString(<Home />);

if (!existsSync("./build")) {
  mkdirSync("build");
}
writeFileSync("./build/index.html", html);
