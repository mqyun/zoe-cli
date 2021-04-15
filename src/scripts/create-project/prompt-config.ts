import projectTemplateGitUrlList from "../../config/global/project-template-git";

// 创建项目终端交互内容
export const promptList = [
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

/**
 * @description 生成创建项目的命令行字符串
 */
export const getCmdStr = (params: {
  /** 项目名称 */
  projectName: string;
  /** 语言 */
  language: string;
}) => {
  const { projectName, language } = params;

  const cmdStrList = [
    `git clone ${projectTemplateGitUrlList[language]} ${projectName}`,
    `cd ${projectName}`,
    'rm -rf .git',
    'rm -rf .gitmodules',
    'rm -rf @xy-lib',
    'git init',
    `git submodule add ${projectTemplateGitUrlList.xyLibSubmoduleGitUrl} ./@xy-lib`,
  ];

  return cmdStrList.join(' && ');
};
