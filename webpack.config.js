const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		'main': [
			'@babel/polyfill',
			'./src/js/Utility.js',
			'./src/js/Window.js',
			'./src/js/Canvas.js',
			'./src/js/sort/BaseSort.js',
			'./src/js/sort/Bubble.js',
			'./src/js/sort/Selection.js',
			'./src/js/sort/Insertion.js',
		]
	},
	output: {
		path: `${__dirname}/dist/js`,
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
				loader: "eslint-loader",
				options: {
					fix: true
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								"@babel/preset-env"
							]
						]
					}
				}
			}
		]
	},
	plugins: [
		new CopyPlugin(
			[
				{
					from: './index.html',
					to: '../'
				}
			]
		),
		new CopyPlugin(
			[
				{
					from: './src/css/main.css',
					to: '../css'
				}
			]
		)
	]
};