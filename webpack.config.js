const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
	mode: process.env.NODE_ENV === "dev" ? "development" : "production",
	target: "web",
	entry: "./src/public/index.tsx",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: [{
				loader: "thread-loader",
			}, {
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react"]
				}
			}],
			exclude: /(node_modules)/,
		}, {
			test: /\.tsx?$/,
			use: [{
				loader: "thread-loader",
			}, {
				loader: "ts-loader",
				options: {
					happyPackMode: true
				}
			}]
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader"
			}]
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader",
			}, {
				loader: "css-loader"
			}]
		}, {
			test: /\.otf$/,
			loader: "file-loader"
		}]
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	devServer: {
		port: 3000,
		host: "0.0.0.0",
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Passkit Visual Designer",
			template: "./src/public/index.html",
			filename: "./index.html"
		}),
		new forkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
		new DefinePlugin({
			isDevelopment: process.env.NODE_ENV === "dev"
		}),
	]
};
