const path = require('path');

module.exports = {
    entry: {
        app: './src/script.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };