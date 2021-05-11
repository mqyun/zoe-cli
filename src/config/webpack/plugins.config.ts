import webpack, { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import nodeNotifier from 'node-notifier';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import globalStore from '../global/global-store';
import resolveApp from '../../utils/resolveApp';
import customConfig from './custom.config';
import getCustomArgv from "../../utils/getCustomArgv";

const packageInfo = require('../../../package.json');
const { isDev, isPro } = globalStore;

const customArgv = getCustomArgv();

const pluginsConfig: Configuration['plugins'] = [
  new WebpackBar({
    name: `${packageInfo.name} building…`,
    color: '#1890FF'
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'zoe app'
  }),
  new ESLintPlugin({
    eslintPath: require.resolve('eslint'),
    extensions: ['js', 'ts', 'jsx', 'tsx', 'json'],
    fix: true
  }),
  isDev && new webpack.HotModuleReplacementPlugin({}),
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
  }),
  isPro && new CopyWebpackPlugin([
    {
      from: resolveApp('public'),
      to: '.',
      ignore: ['index.html'],
    },
  ]),
  new webpack.DefinePlugin({
    process: {
      env: {
        mode: JSON.stringify(globalStore.mode),
        NODE_ENV: JSON.stringify(globalStore.mode),
        ...customArgv
      }
    },
    ...customConfig.define
  })
].filter(Boolean);

export default pluginsConfig;
