var path = require('path');
module.exports = {
	entry: [
		'./src/app.js'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
