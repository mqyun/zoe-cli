import inquirer from 'inquirer';
import { exec } from 'child_process';

import projectTemplateGitUrlList from '../config/global/project-template-git';

// 创建项目终端交互内容
const promptList = [
  {
    type: 'input',
    message: '项目名称：',
    name: 'projectName',
    default: 'test-project',
  },
  {
    type: 'list',
    message: '语言：',
    name: 'language',
    choices: ['TypeScript', 'JavaScript'],
    filter: (val) => val.toLowerCase(),
  },
];

export default async function () {
  const { projectName, language } = await inquirer.prompt(promptList);
  console.log('项目创建中……');

  const cwd = process.cwd();
  const cmdStrList = [
    `git clone ${projectTemplateGitUrlList[language]} ${projectName}`,
    `cd ${projectName}`,
    'rm -rf .git',
    'rm -rf .gitmodules',
    'rm -rf @xy-lib',
    'git init',
    `git submodule add ${projectTemplateGitUrlList.xyLibSubmoduleGitUrl} ./@xy-lib`,
  ];
  exec(cmdStrList.join(' && '), { cwd }, function(err) {
    if (err) {
      // 截取错误提示并在控制台输出
      const failStrIndex = err.message.indexOf('fatal:');
      console.log('项目创建失败');
      console.log('失败原因：', err.message.slice(failStrIndex));
      return;
    }
    console.log('项目创建成功');
  });
}
