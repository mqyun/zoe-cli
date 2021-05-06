import globalStore from '../../global/global-store';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import customConfig from '../custom.config';

interface IGetStyleLoadersOptions {
  /** css-loader 配置 */
  cssLoaderOptions?: any;
  /** 是否使用 css module */
  useCssModule?: boolean;
  /** 其他预处理器 */
  preProcessor?: 'less-loader' | 'sass-loader';
}

const getStyleLoaders = (options: IGetStyleLoadersOptions) => {
  const { isDev, isPro } = globalStore;
  const { sourceMap } = customConfig;
  const { cssLoaderOptions, preProcessor } = options;

  const loaders = [
    isDev && require.resolve('style-loader'),
    isPro && MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap,
        ...cssLoaderOptions,
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            })
          ].filter(Boolean),
        },
        sourceMap
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    if (preProcessor === 'less-loader') {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap,
          lessOptions: {
            javascriptEnabled: true,
          }
        }
      });
    } else if (preProcessor === 'sass-loader') {
      loaders.push({
        loader: require.resolve(preProcessor)
      });
    } else {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap
        }
      });
    }
  }
  return loaders;
};

export default getStyleLoaders;
