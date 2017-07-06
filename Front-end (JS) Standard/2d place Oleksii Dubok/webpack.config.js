const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry : {
        bundle: [
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/main.js'
        ]},
    output: {
        path    : path.resolve(__dirname, 'public/build'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, 
                use: ['babel-loader', 'eslint-loader'] 
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader', 
                        options: { 
                            modules: true, 
                            importLoaders: 1, 
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(otf|eot|ttf|ttc|woff|jpe?g|png|gif)$/,
                use: [
                    'url-loader?limit=24000',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 3,
                            },
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [{ removeTitle: false }],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            }       
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'DevChallenge_final',
            template: './src/index.html'
        }),
        new ProgressBarPlugin({ format: '  Building DevChallenge_final [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)', clear: false }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
