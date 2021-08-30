const path = require('path');

module.exports = {
  mode: 'development',
  // process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/client'),
      publicPath: '/',
    },
    port: 8080,
    proxy: {
      '/oauth': 'http://localhost:3000',
      '/google': 'http://localhost:3000',
      '/depositAmount': 'http://localhost:3000',
      '/withdrawAmount': 'http://localhost:3000',
    },
    hot: true,

  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }

    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}