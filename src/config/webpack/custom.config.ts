import fs from 'fs';

import resolveApp from '../../utils/resolveApp';
import { customConfigFileName } from '../global/global-config';
import { ICustomConfig, ICustomConfigFileExport } from '../../declaration/custom-config-declaration';
import globalStore from '../global/global-store';
import getCustomArgv from '../../utils/getCustomArgv';

// require 项目自定义配置
const customConfigRequire: ICustomConfigFileExport = fs.existsSync(resolveApp(customConfigFileName))
  ? require(resolveApp(customConfigFileName)) : {};
let requireConfig: ICustomConfig;

if (typeof customConfigRequire === 'function') {
  // 项目自定义配置是个方法
  requireConfig = customConfigRequire({
    mode: globalStore.mode,
  });
} else {
  requireConfig = customConfigRequire;
}

// 默认的自定义配置信息
const initCustomConfig: ICustomConfig = {
  port: 666,
  title: 'zoe app',
  publicPath: '/',
  alias: {
    '@': resolveApp('src')
  },
  sourceMap: false
};

// 合并默认配置自定义和项目自定义配置
const customConfig: ICustomConfig = {
  ...initCustomConfig,
  ...requireConfig,
  sourceMap: globalStore.isDev ? false : (requireConfig.sourceMap ?? initCustomConfig.sourceMap)
};

export default customConfig;
