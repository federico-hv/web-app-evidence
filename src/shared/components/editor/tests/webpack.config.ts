import { resolve } from "path";

module.exports = {
  entry: "./Editor/Editor.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
  },
};
