module.exports = {
  entry: './scripts/main.tsx',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]' }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
}