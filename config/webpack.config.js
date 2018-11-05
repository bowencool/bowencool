const path = require("path");
const { entry } = require("./utilitys");

module.exports = {
	mode: "production",
	entry,
	output: {
		path: path.resolve(__dirname, "../lib"),
		filename: "[name].js",
		library: 'bowencool',
		libraryExport: 'default',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, "../src")],
				use: "babel-loader",
			},
		],
	},
};
