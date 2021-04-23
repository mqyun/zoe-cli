import { Configuration } from 'webpack';

import resolveApp from '../../utils/resolveApp';
import globalStore from '../global/gobal-store';

import pluginsConfig from './plugins.config';
import customConfig from './custom.config';

export default () => {
  const { mode, isDev, isPro } = globalStore;
  const outputFileName = isPro ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js';

  const baseConfig: Configuration = {
    mode,

    entry: [resolveApp('src')],

    output: {
      path: resolveApp('build'),
      filename: outputFileName,
      chunkFilename: outputFileName,
      publicPath: isPro ? customConfig.publicPath : '/'
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.less', '.css', '.json']
    },

    plugins: pluginsConfig
  };

  return baseConfig;
};
