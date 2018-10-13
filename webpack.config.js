'use strict';

const env = process.env.NODE_ENV || 'production';
console.log(`Webpack ENV: ${env}`);

// default production config
const config = {
  mode: 'production',
  target: 'node',

  output: {
    library: 'katana',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
        enforce: 'pre'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  }
};

if(env === 'test') {
  Object.assign(config, {
    mode: 'development',
    target: 'node',

    entry: './src/index.spec',
    output: {
      filename: 'spec.js'
    },

    devtool: 'source-map'
  });
}

module.exports = config;
