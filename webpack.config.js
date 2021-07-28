const path = require('path');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

module.exports ={
  entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    devServer:{
        port: 8000,
        watchContentBase: true,
        hot: true,
        historyApiFallback: true,

    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test:/\.scss$/,
            use: ['style-loader','css-loader','sass-loader']
        },
          {
            test: /\.(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 100000,
                  name: '[name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          }
        ],
      },
    
    plugins: [
        new AntdScssThemePlugin('./theme.scss'),
    ]
}