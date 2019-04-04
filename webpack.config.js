var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    target: 'electron-renderer',
    entry: {
        index: "./src/app.tsx"
    },

    devtool: 'source-map',

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            logInfoToStdOut: true,
                            logLevel: 'info'
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/tpl/index.html',
            title: 'Fullnode UI'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'tmp'),
        host: 'localhost',
        port: 5000,
        historyApiFallback: true
    }
}