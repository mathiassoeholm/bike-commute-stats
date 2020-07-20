import React from "react";
import ReactDOMServer from "react-dom/server";
import { Home } from "./site/home";

const html = ReactDOMServer.renderToString(<Home />);

console.log(html);
