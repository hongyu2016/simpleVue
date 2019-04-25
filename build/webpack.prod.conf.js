var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(baseConfig, {
    devtool: 'source-map', // 压缩方式
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
                /* use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ] */
            },
            {
            test: /\.less$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                'css-loader',
                'less-loader',
                'postcss-loader'
                ]
                /* use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ] */
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    optimization: { //压缩
        minimizer: [
            // 压缩JS
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false, // 去除警告
                        drop_debugger: true, // 去除debugger
                        drop_console: true // 去除console.log
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 平行压缩
                sourceMap: false // set to true if you want JS source maps
            }),
            // 压缩css
            new OptimizeCSSAssetsPlugin({})
        ]
    },
})
