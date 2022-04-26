const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  optimization: {
    minimize: !isDev
  },
  entry: {
    main: path.resolve(__dirname, "src", "client", "js", "main.js"),
    offline: path.resolve(
      __dirname,
      "src",
      "client",
      "js",
      "offline-display.js"
    ),
    styles: path.resolve(__dirname, "src", "client", "css", "main.css"),
    notes: path.resolve(__dirname, "src", "client", "css", "notes.css")
  },
  output: {
    path: path.resolve(__dirname, "public", "client"),
    filename: isDev ? `[name].js` : `[name].[contenthash].js`
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
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  },

  plugins: [
    new WebpackManifestPlugin({ publicPath: "/client/" }),
    new MiniCssExtractPlugin({
      filename: isDev ? `[name].css` : `[name].[contenthash].css`
    })
  ],

  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify")
    }
  }
};
