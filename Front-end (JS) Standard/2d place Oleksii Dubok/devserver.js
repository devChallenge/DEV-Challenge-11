/* eslint-disable */

let webpack          = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let config           = require('./webpack.config.js');
let path             = require('path');

new WebpackDevServer(webpack(config), {
    contentBase       : path.join(__dirname, 'dist'),
    port              : 3000,
    stats: { colors: true },
    open              : true,
    historyApiFallback: true,
    hot               : true,
    hotOnly: true
}).listen(3000, '0.0.0.0', (err) => {
    if (err) {
        return console.log(err);
    }
});
