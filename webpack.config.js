const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		'main': [
			'@babel/polyfill',
			'./src/app.js'
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
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									"useBuiltIns": "entry"
								}
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
		)
	]
};