var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin=require('vue-loader/lib/plugin');
var AutodllWebpackpackPlugin = require('autodll-webpack-plugin');
module.exports = {
    //入口文件
    entry:{
        main: path.resolve(__dirname, '../src/main.js')
    },
    //输出目录
    output:{
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, //匹配.js结尾的文件
                use: ['babel-loader'],
                exclude:/node_modules/ //排除node_modules里面的js
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use:['file-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/
            },
            /* {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader: 'vue-style-loader'
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader: 'vue-style-loader'
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }, */
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins:[
        new webpack.HashedModuleIdsPlugin(), // 解决vender后面的hash每次都改变
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new VueLoaderPlugin(), // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
        new AutodllWebpackpackPlugin ({ //插件会自动把打包出来的第三方库文件插入到 HTML
            inject: true,
            debugger: true,
            filename: '[name].js',
            path: './dll',
            entry: {
                vendor: ['vue'] //vue
            }
        }),
        new webpack.optimize.SplitChunksPlugin()
    ],
    resolve: {
        // 能够使用户在引入模块时不带扩展
        extensions: ['.js', '.json', '.vue', 'css'],
        alias: {
            'vue$':'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
     
    }
}