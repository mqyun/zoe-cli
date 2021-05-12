//env-node

import program from 'commander';

import createProject from '../scripts/create-project/create-project';
import { ModeEnum } from '../declaration/global-declaration';
import doPack from '../scripts/do-pack/do-pack';
import sync from '../scripts/sync/sync';

const packageInfo = require('../../package.json');

program
  .version(packageInfo.version);
  // .option('-s --sourcemap', '构建时生成 map 文件');

program
  .command('create')
  .description('创建项目')
  .action(() => {
    createProject();
  });

program
  .command('start')
  .description('启动项目')
  .action(() => {
    console.log('项目启动中……');
    doPack({
      mode: ModeEnum.DEV
    });
  });

program
  .command('build')
  .description('构建项目')
  .action(() => {
    console.log('项目构建中……');
    doPack({
      mode: ModeEnum.PRO
    });
  });

program
  .command('sync')
  .description('同步配置')
  .action(() => {
    sync();
  });

program.parse(process.argv);
