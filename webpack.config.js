const debug = process.env.NODE_ENV !== 'production'

const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const fwp = require('favicons-webpack-plugin')
const hwp = require('html-webpack-plugin')

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: [`${__dirname}/lib/script.js`],
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, exclude: ['/node_modules/', '/js/', '/svg/'], loader: 'style-loader!css-loader!postcss-loader!' },
            { test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192' },
            { test: /\.js$/, exclude: ['/node_modules/', '/css/'], loader: 'babel-loader' }
        ]
    },
    postcss: function() {
        return [precss, autoprefixer]
    },
    //plugins: debug ? [] : []
    plugins: [
        new fwp({
            logo: './svg/dolphin.png',
            // Inject the html into the html-webpack-plugin
            inject: true
        }),
        new hwp({
            template: `${__dirname}/html/index.html`
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
}
