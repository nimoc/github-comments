var webpack = require('webpack')
module.exports = {
    entry: {
        'gc': './lib/index.js'
    },
    output: {
        path: './',
        libraryTarget: "umd",
        library: 'gc',
        filename: "gc.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                         "es2015"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}