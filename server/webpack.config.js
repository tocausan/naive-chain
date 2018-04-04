const appRoot = require('app-root-path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        index: [
            appRoot.path + '/src/views/index/index.html',
            appRoot.path + '/src/views/index/index.js',
            appRoot.path + '/src/views/index/index.scss'
        ]
    },
    externals: [
        /^[a-z\-0-9]+$/
    ],
    output: {
        path: appRoot.path + '/build',
        filename: 'public/dist/[name].bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            appRoot.path + '/node_modules',
            'node_modules'
        ]
    },
    devServer: {
        contentBase: appRoot.path + '/src',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/public/dist/img/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src'],
                            minimize: true,
                            removeComments: true,
                            collapseWhitespace: true
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/views/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            name: 'public/dist/[name].[ext]'
                        }
                    },

                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin()
    ]
};