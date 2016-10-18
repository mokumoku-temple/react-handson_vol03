module.exports = {
  entry: {
    js: './scripts/index.js',
    html: './scripts/index.html',
  },
  output: {
    path: `${__dirname}/out`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'out',
    port: 3000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', './scripts'],
  },
};
