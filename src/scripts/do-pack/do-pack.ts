import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { ModeEnum } from '../../declaration/global-declaration';
import configuration from '../../config/webpack/webpack.config';
import resolveApp from '../../utils/resolveApp';
import globalStore from '../../config/global/global-store';

interface IDoPackParams {
  mode: ModeEnum;
}

export default (params: IDoPackParams) => {
  const { mode } = params;
  // 初始化数据仓库
  globalStore.mode = mode;
  // webpack 配置信息
  const config = configuration();
  // custom.config 中用到了数据仓库信息，等待数据仓库信息初始化完成后引入 custom.config
  const customConfig = require('../../config/webpack/custom.config').default;

  if (mode === ModeEnum.DEV) {
    // dev server 启动配置
    const devServerOptions = {
      contentBase: resolveApp('public'),
      hot: true,
      host: '0.0.0.0',
      useLocalIp: true,
      overlay: true,
      stats: 'errors-only'
    };
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(customConfig.port);
  } else if (mode === ModeEnum.PRO) {
    // 生产环境
    webpack(config, (err) => {
      if (err) {
        console.error(err.stack || err);
      }
    });
  }
};
