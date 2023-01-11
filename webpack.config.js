
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  // target: ["web", "es5"],
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: env.production ? "source-map" : "eval-source-map",
  mode: env.production ? "production" : "development",
  module: {
    strictExportPresence: true, // Включаем строгий режим, чтобы попытка импортировать несуществующие объекты приводила к падению билда
    rules: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates style nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          // options: {
          //   lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
          //     modifyVars: {
          //       'primary-color': '#5827a8',
          //       'border-radius-base': '8px',
          //     },
          //     javascriptEnabled: true,
          //   },
          // },
        }],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html')
    })
  ],
  resolve:
  {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      actions$: path.resolve(__dirname, 'src/store/reducers/ActionCreators.ts'),
    },
  }
})