const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/app.js',
  context: __dirname,
  devtool: isProduction ? 'none' : 'inline-source-map',
  mode: isProduction ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader'],
      },
    ],
  },
}
