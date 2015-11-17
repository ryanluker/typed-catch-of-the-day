module.exports = {
  entry: './scripts/main.ts',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader'},
      { test: /\.styl$/, loader: 'style!css' }
    ]
  }
}