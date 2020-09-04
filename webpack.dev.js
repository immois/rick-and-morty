const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    hot: true,
    host: "localhost",
    port: 3001,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|ttf|eot|otf|woff)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Rick and Morty",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
