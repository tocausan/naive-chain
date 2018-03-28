const appRoot = require('app-root-path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        index: [
            appRoot.path + '/views/index/index.html',
            appRoot.path + '/views/index/index.js',
            appRoot.path + '/views/index/index.scss'
        ]
    },
    externals: [
        /^[a-z\-0-9]+$/
    ],
    output: {
        path: appRoot.path + '/public/dist',
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: appRoot.path,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }
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
                    {loader: 'ts-loader'}
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin()
    ]
};