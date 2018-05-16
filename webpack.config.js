const ArcGISPlugin = require('@arcgis/webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: './src/index.tsx'
	},
	output: {
		filename: '[name].bundle.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: false }
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [
					{
						loader: require.resolve('file-loader'),
						options: {
							name: 'media/[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'media/[name].[hash:8].[ext]'
				}
			}
			// {
			// 	test: /\.css$/,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader']
			// }
			// {
			// 	test: /\.scss$/,
			// 	use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			// }
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ArcGISPlugin(),
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			chunksSortMode: 'none'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	],
	resolve: {
		modules: [path.resolve(__dirname, '/src'), 'node_modules/'],
		extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
	},
	externals: [
		(context, request, callback) => {
			if (/pe-wasm$/.test(request)) {
				return callback(null, 'amd ' + request);
			}
			callback();
		}
	],
	node: {
		process: false,
		global: false
	}
};
