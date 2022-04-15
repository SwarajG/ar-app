const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
// console.log('isProduction: ', isProduction);

module.exports = {
  entry: {
    dashboard: ['./public/dashboard/index.js'],
    // dashboardCss: ['./public/dashboard/index.scss'],
    product: ['./public/product/js/index.js'],
  },
  output: {
    filename: isDevelopment
      ? '[name]-[contenthash].js'
      : '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'public/assets'),
  },
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin({
      basePath: '',
      fileName: 'rev-manifest.json',
      merge: true,
      map: (f) => {
        f.path = f.path.replace(/^auto/, 'assets');
        return f;
      },
      filter(entry) {
        if (entry.name.toLowerCase().endsWith('.map')) {
          return false;
        }
        return entry;
      },
    }),
  ],
};
