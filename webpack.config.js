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
                test: /\.json$/,
                loader: 'json-loader'
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
        new webpack.optimize.UglifyJsPlugin({
            comments: function(node, comment) {
                var text = comment.value;
                var type = comment.type;
                if (type == "comment2") {
                    // multiline comment
                    return /@nimojs/i.test(text);
                }
            }
        })
    ]
}
