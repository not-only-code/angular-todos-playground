module.exports = function() {
    return {
        entry: {
            app: './src/app.js'  
        },
        module: {
            loaders: [
                { test: /\.tpl\.html$/, loader: "html" }
            ]
        },
        htmlLoader: {
            ignoreCustomFragments: [ /\{\{.*?}}/ ]
        },
        output: {
            path: __dirname + '/dist/',
            filename: 'js/bundle.js'
        },
        devServer: {
            contentBase: __dirname + '/dist',
            stats: 'minimal',
            hot: false,
            compress: true,
            historyApiFallback: true
        }
    };
}();