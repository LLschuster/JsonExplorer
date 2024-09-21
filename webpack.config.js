const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
    devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 6969,
  },
 performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}

};