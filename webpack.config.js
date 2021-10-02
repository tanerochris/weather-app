const path = require('path');

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve('public/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
             },
             {
                test: /\.(s?)css$/,
                use: ['style-loader','css-loader', 'sass-loader']
             },
             {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]'
                }
              }
        ]
    }
  };