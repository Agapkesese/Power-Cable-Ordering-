const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Ensure the correct path to your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output file name
  },
  watch: true, // Rebuilds when changes are made
  module: {
    rules: [
      {
        test: /\.js$/, // Target JavaScript files
        exclude: /node_modules/, // Exclude dependencies
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // Use Babel to transpile modern JS
          }
        }
      }
    ]
  },
  devtool: 'source-map' // Useful for debugging (maps to original JS files)
};
