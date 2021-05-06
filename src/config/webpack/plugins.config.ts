import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import nodeNotifier from 'node-notifier';

import globalStore from '../global/global-store';

const packageInfo = require('../../../package.json');
const { isPro } = globalStore;

export default [
  new WebpackBar({
    name: `${packageInfo.name} building…`,
    color: '#1890FF'
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'zoe app'
  }),
  new webpack.HotModuleReplacementPlugin({}),
  new FriendlyErrorsPlugin({
    onError(severity, errors) {
      if (severity !== 'error') {
        return;
      }
      const error = errors[0];
      nodeNotifier.notify({
        title: `${packageInfo.name} error`,
        message: severity + ': ' + error.name,
        subtitle: error.file || '',
      });
    }
  }),
  isPro && new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
  })
].filter(Boolean);
