module.exports = {
  entry: './scripts/main.tsx',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['', '.webpack.js', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}