//env-node

import program from 'commander';
import createProject from '../scripts/create-project/create-project';

const packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .option('-s --sourcemap', '构建时生成 map 文件');

program
  .command('create')
  .description('创建项目')
  .action(() => {
    createProject();
  });

program.parse(process.argv);
