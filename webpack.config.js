var
	debug = process.env.NODE_ENV !== "production",
	webpack = require('webpack'),
	path = require('path');

const
	Path = Object.freeze({
		SRC: 'src',
		DEBUG_DEVTOOL: 'inline-sourcemap',
		ENTRY: './app.js',
		OUTPUT_FILENAME: "app.min.js"
	}),

	REACT_LOADER_BABEL = {
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015', 'stage-0'],
			plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
		}
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
		loaders: [REACT_LOADER_BABEL]
	},
	output: {
		path: `${__dirname}/${Path.SRC}/`,
		filename: "app.min.js"
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(UGLIFY_OPTIONS),
	]
};
