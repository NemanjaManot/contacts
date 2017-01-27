var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
     entry: ['babel-polyfill', './src/app.js'],
     output: {
         path: './dist',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [
             {
                 test: /\.scss$/,
                 loader: ExtractTextPlugin.extract('css-loader!sass-loader')
             },
             {
                 test: /\.jsx?$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                    presets: ['react', 'es2015']
                 }
              }
         ]
     },
    plugins: [
        new ExtractTextPlugin('style.css', {allChunks: true}),
        new HtmlWebpackPlugin({template: './src/index.html'})
    ],
    devtool: 'source-map'
 };