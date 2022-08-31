const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",
  entry: "./demo/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader", options: { transpileOnly: true } }
    ]
  }
};

module.exports = config;
