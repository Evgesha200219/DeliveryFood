const path = require("path")

module.exports = {
  entry: {
    main: "./src/index.js",
    menu: "./src/menu.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  devtool: 'eval-source-map'
}
