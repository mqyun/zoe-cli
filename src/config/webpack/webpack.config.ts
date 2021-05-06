import { Configuration } from 'webpack';

import resolveApp from '../../utils/resolveApp';
import globalStore from '../global/global-store';

import pluginsConfig from './plugins.config';
import customConfig from './custom.config';
import moduleConfig from './module.config';

export default () => {
  const { mode, isDev, isPro } = globalStore;
  const outputFileName = isPro ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js';

  const baseConfig: Configuration = {
    mode,

    stats: 'errors-only',

    entry: [resolveApp('src')],

    output: {
      path: resolveApp('build'),
      filename: outputFileName,
      chunkFilename: outputFileName,
      publicPath: isPro ? customConfig.publicPath : '/'
    },

    module: moduleConfig,

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.css', '.json'],
      alias: customConfig.alias
    },

    plugins: pluginsConfig,

    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000,
      ignored: /node_modules/
    },

    devtool: customConfig.sourceMap ? 'source-map' : (isDev ? 'cheap-module-source-map' : void 0)
  };

  return baseConfig;
};
