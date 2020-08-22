const dev = process.env.NODE_ENV !== "production";
const path = require("path");
// import path from "path";
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
// import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
// import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: "styles.css",
    }),
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./client.js",
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },
    plugins,
};
