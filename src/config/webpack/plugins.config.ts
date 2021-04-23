import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const packageInfo = require('../../../package.json');

export default [
  new WebpackBar({
    name: `${packageInfo.name} building…`,
    color: '#1890FF'
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'zoe app'
  }),
  new webpack.HotModuleReplacementPlugin({})
];
