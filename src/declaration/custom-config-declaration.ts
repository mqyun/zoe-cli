import { Configuration } from 'webpack';
import { ModeEnum } from './global-declaration';

/**
 * @description 自定义配置声明
 */
export interface ICustomConfig {
  /** 端口号 */
  port?: number;

  /** webpack 的 publicPath */
  publicPath?: string;

  /** 代理配置，webpack-dev-server proxy */
  proxy?: any;

  /** dev server 配置 */
  devServerOption?: any;

  /** webpack alias 配置 */
  alias?: Configuration['resolve']['alias'];

  /** 是否生成 map 文件 */
  sourceMap?: boolean;
}

/**
 * @description 自定义配置文件导出方法的参数声明
 */
interface ICustomConfigFileExportFunParams {
  mode: ModeEnum;
}

/**
 * @description 自定义配置文件导出的类型
 */
export type ICustomConfigFileExport = ICustomConfig | ((params: ICustomConfigFileExportFunParams) => ICustomConfig);
