import path from 'path';
import fs from 'fs';
import resolveApp from '../../utils/resolveApp';

const resolveCli = (relativePath) => path.resolve(__dirname.slice(0, -17), relativePath);

export default () => {
  console.log('开始同步公用配置信息');
  console.log('同步中……');
  const templatePath = resolveCli('config-template');
  const templates = fs.readdirSync(templatePath);
  templates.forEach((templateName) => {
    const projectCurrentTemplatePath = resolveApp(templateName);
    const currentTemplatePath = resolveCli(`config-template/${templateName}`);
    if (fs.existsSync(projectCurrentTemplatePath)) {
      fs.unlinkSync(projectCurrentTemplatePath);
    }
    const templateStr = String(fs.readFileSync(currentTemplatePath));
    fs.writeFile(resolveApp(templateName), templateStr, function(err) {
      if (err) {
        console.log(`写入文件 ${templateName} 失败。`, err);
        return;
      }
      console.log(`${templateName} 同步完成`);
    })
  });
};
