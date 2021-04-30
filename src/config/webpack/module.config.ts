import { Configuration } from 'webpack';
import babelConfig from './babel.config';
import getStyleLoaders from "./utils/get-style-loaders";

const regOptions = {
  baseScript: /\.(js|jsx|ts|tsx)$/,
  cssRegex: /\.css$/,
  cssModuleRegex: /\.module\.css$/,
  sassRegex: /\.(scss|sass)$/,
  sassModuleRegex: /\.module\.(scss|sass)$/,
  lessRegex: /\.less$/,
  lessModuleRegex: /\.module\.less$/
};

function moduleConfig(): Configuration['module'] {
  return {
    rules: [
      {
        oneOf: [
          {
            test: regOptions.baseScript,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: babelConfig()
          },
          {
            test: regOptions.cssRegex,
            exclude: regOptions.cssModuleRegex,
            use: getStyleLoaders()
          }
        ]
      }
    ]
  };
};

export default moduleConfig;
