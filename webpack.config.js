const
  debug = process.env.NODE_ENV !== 'production',
  webpack = require('webpack'),
  path = require('path');

const
  Path = Object.freeze({
    SRC: 'src',
    DEBUG_DEVTOOL: 'inline-sourcemap',
    ENTRY: './app.js',
    OUTPUT_FILENAME: 'bundle.js',
    OUTPUT: 'dist'
  }),

  REACT_BABEL_LOADER = {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'es2015', 'stage-0'],
      plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
    }
  },

  REACT_IMAGES_LOADER = {
    test: /\.(png|jpg|svg)$/,
    loader: 'file-loader?name=dist/images/[name].[ext]'
  },

  SCSS_LOADER = {
    test: /\.scss?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'style-loader!css-loader!sass-loader',
  },

  UGLIFY_OPTIONS = {
    mangle: false,
    sourcemap: false
  };

module.exports = {
  context: path.join(__dirname, Path.SRC),
  devtool: debug ? Path.DEBUG_DEVTOOL : null,
  entry: Path.ENTRY,
  module: {
    loaders: [
      REACT_BABEL_LOADER,
      SCSS_LOADER,
      REACT_IMAGES_LOADER
    ]
  },
  output: {
    path: `${__dirname}/${Path.OUTPUT}/`,
    filename: `${Path.OUTPUT_FILENAME}`
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(UGLIFY_OPTIONS),
  ]
};
