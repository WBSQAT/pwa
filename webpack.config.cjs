const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/script.js",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
    hot: true,
    port: 8081,
    open: true
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      filename: "index.html",
      template: "./public/index.html",
    }),
  ],
};
