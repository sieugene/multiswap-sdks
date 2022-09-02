var webpack = require('webpack');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ];

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      constants: false,
      querystring: false,
      url: false,
      path: false,
      os: false,
      http: require.resolve('http-browserify'),
      https: require.resolve('https-browserify'),
      zlib: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    };
    return config;
  },
};
