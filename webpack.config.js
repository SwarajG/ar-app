const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const isLocal = process.env.NODE_ENV !== 'production';
// console.log('isProduction: ', isProduction);

module.exports = {
  entry: {
    dashboard: ['./public/dashboard/index.js'],
    product: ['./public/product/js/index.js'],
  },
  output: {
    filename: isLocal ? '[name]-[contenthash].js' : '[name]-[contenthash].js',
    path: path.resolve(__dirname, 'public/assets'),
  },
  mode: isLocal ? 'development' : 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new WebpackManifestPlugin({
      basePath: '',
      fileName: 'rev-manifest.json',
      map: (f) => {
        f.path = f.path.replace(/^auto/, 'assets');
        return f;
      },
    }),
  ],
};
