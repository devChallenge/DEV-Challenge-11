// Require
const path = require('path');
const webpack = require('webpack');
// Package
const pack = require('./package.json');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Paths
const distPath = path.resolve(__dirname, 'dist');
const appPath = path.resolve(__dirname, 'src');
// Config
let config = {
    entry: {
        'app': appPath + '/app.jsx'
    },
    output: {
        path: distPath,
        filename: 'app/[name].js'
    },
    resolve: {
        alias: {
            assets: appPath + '/assets',
            core: appPath + '/core',
            components: appPath + '/components',
            helpers: appPath + '/helpers',
            pages: appPath + '/pages',
            services: appPath + '/services',
            consts: appPath + '/consts',
            style: appPath + '/style',
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx?/, use: 'babel-loader', include: appPath },
            { test: /\.(png|woff|woff2|eot|ttf|svg)/, use: 'url-loader?limit=100000' },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: pack.title,
            subtitle: pack.subtitle,
            description: pack.description,
            filename: 'index.html',
            template: 'src/templates/index.ejs',
            hash: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true
            },
        }),
        new CopyWebpackPlugin([
            {context: 'src', from: 'assets/img/*'},
        ]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pack.version),
            ENV: JSON.stringify(process.env.ENV),
            TITLE: JSON.stringify(pack.title),
            SUBTITLE: JSON.stringify(pack.subtitle),
        })
    ]
}
module.exports = config;