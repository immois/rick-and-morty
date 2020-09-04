const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPLugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "js/[name].[hash].js",
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
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
        use: [
          {
            loader: MiniCSSExtractPLugin.loader,
          },
          "css-loader",
        ],
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
    new HtmlWebpackPlugin({
      title: "Rick and Morty",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new MiniCSSExtractPLugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          name: "vendor",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
};
