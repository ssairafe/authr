const path = require('path');
require('dotenv/config');

const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './client',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.DEV_PORT,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /uploads/
    },
    stats: 'minimal',
    proxy: {
      '/api': 'http://localhost:' + process.env.PORT
    }
  }
};
