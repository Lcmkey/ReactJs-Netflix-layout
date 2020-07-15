require("dotenv").config();

const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const webpackConfig = require(path.join(__dirname, "../webpack.config.js"));

const compiler = webpack(webpackConfig);
const app = express();

app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
  const port = server.address().port;
  const host = server.address().address;

  console.log("------------ %s ------------", "Server Info");
  console.log("Nodejs vsersion : %s", process.version);
  console.log("Server Port : %s", port);
  console.log("Server Address : %s", host);
  console.log(`Listening at http://localhost:${PORT}`);
});
