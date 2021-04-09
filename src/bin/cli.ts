//env-node

const program = require('commander');

const packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .option('-s --sourcemap', '构建时生成 map 文件');

program
  .command('create')
  .description('创建项目')
  .action(() => {
    console.log('创建项目');
  });

program.parse(process.argv);
