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
        path: appRoot.path + '/src/public/dist',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        modules: [
            appRoot.path + '/node_modules',
            'node_modules'
        ]
    },
    devServer: {
        contentBase: appRoot.path + '/views',
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
                exclude: appRoot.path + '/public/components',
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