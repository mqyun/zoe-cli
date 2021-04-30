import globalStore from '../../global/global-store';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function getStyleLoaders() {
  const { isDev, isPro } = globalStore;

  const loaders = [
    isDev && require.resolve('style-loader'),
    require.resolve('css-loader'),
    isPro && MiniCssExtractPlugin.loader
  ].filter(Boolean);

  return loaders;
}
