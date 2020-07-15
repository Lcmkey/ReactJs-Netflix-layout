const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { PORT, NODE_ENV = "Dev" } = process.env;

const ENVMapping = {
  Dev: "development",
  Prod: "production"
};

module.exports = {
  devtool: "source-map", //dev: "source-map" / production: false / cheap-module-eval-source-map
  mode: ENVMapping[NODE_ENV], // development || production
  entry: {
    main: path.join(__dirname, "client/src/index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "App title here",
      template: path.join(__dirname, "client/public/index.ejs"),
      filename: "index.html"
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|express)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src"]
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, "/client/img"),
        loader: "file-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    proxy: {
      "/api": `http://localhost:${PORT}`
    }
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  resolveLoader: {
    moduleExtensions: ["babel-loader"]
  },
  devtool: "source-map",
  mode: "development",
  node: { global: true, fs: "empty", net: "empty", tls: "empty" }
};
