const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },    
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
    },  
    devServer: {
        static: './dist',
        watchFiles: ['src/component/**/*.html'],
        hot: false,
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    
};