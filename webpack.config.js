//* I have changed this to allow us to import css and scss
//* Files directly into components on the front end. ~Brynn
//* I added a loader for .png  ~hq
module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  // mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.png'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
};
//* In case you wanted to see the old config
//* I did not delete it!
// module.exports = {
//   entry: [
//     './client/index.js'
//   ],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js'
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         options: {
//           presets: [
//             '@babel/preset-react'
//           ]
//         }
//       }
//     ]
//   }
// }
