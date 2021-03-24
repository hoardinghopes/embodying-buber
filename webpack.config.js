const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const isDev = process.env.APP_ENV === "development";

const baseFilename = isDev ? "main" : "main.[contenthash]";

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "assets", "js", "main.js"),
    stats: path.resolve(__dirname, "src", "assets", "js", "stats.js"),
    styles: path.resolve(__dirname, "src", "assets", "css", "main.css"),
  },
  output: {
    path: path.resolve(__dirname, "public", "assets"),
    filename: isDev ? "[name].js" : "[name].[contenthash].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new WebpackManifestPlugin({ publicPath: "/assets/" }),
    new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
  ],
};
