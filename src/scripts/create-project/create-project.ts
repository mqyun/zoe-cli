import inquirer from 'inquirer';
import { exec } from 'child_process';

import { promptList, getCmdStr } from './prompt-config';

export default function () {
  inquirer.prompt(promptList).then(({ projectName, language }) => {
    console.log('项目创建中……');

    const cwd = process.cwd();
    const cmdStr = getCmdStr({
      projectName,
      language
    });
    exec(cmdStr, { cwd }, function(err) {
      if (err) {
        // 截取错误提示并在控制台输出
        const failStrIndex = err.message.indexOf('fatal:');
        console.log('项目创建失败');
        console.log('失败原因：', err.message.slice(failStrIndex));
        return;
      }
      console.log('项目创建成功');
    });
  });
}
