const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    dashboard: ['./public/dashboard/index.js'],
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
