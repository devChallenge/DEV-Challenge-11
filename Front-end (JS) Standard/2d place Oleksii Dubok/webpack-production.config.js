const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './build/app.bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, 
                use: 'babel-loader' 
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // Could also be write as follow:
                    // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader',
                        'less-loader'                        
                    ]
                })
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
        new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG', 'VERSION']),
        new HtmlWebpackPlugin({
            title: 'DevChallenge_final',
            minify: {
                collapseWhiteSpace: true
            },
            template: './src/index.html'
        }),
        new ExtractTextPlugin('./build/styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // remove warnings
                warnings: false,
                // Drop console statements
                drop_console: true
            }
        }),
        new ProgressBarPlugin({ format: '  Building DevChallenge_final [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)', clear: false }),
    ]
};
    