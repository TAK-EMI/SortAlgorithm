module.exports = {
	mode: 'development',
	entry: [
		'@babel/polyfill',
		'./src/'
	],
	output: {
		path: `${__dirname}/dist`,
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}