const path = require("path");
// const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/script.js",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true, //if nothing to update looping message comment this!
    hot: true,
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
    // // Provides jQuery for other JS bundled with Webpack
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
  ],
};
