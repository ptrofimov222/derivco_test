const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
    devtool: "inline-source-map",
    entry: "./src/app.ts",
    mode: "development",
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 4200
    },
    plugins: [
        //new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({title: "Derivco test"}),
        new CopyWebpackPlugin([
            {from: "./src/assets", to: "assets"},
            {from: "./src/config", to: "config"}
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader"
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "file-loader"
            }
        ]
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                /*configFile: "./path/to/tsconfig.json" */
            })
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
