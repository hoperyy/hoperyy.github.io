const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const readdir = require('recursive-readdir-sync');
const readFileTree = require('directory-tree');
const relative = require('relative');

const root = path.join(__dirname, '../../');
const docDir = path.join(root, 'docs');

const targetIframeDir = path.join(docDir, '_iframe');

fse.removeSync(targetIframeDir);
fse.ensureDirSync(targetIframeDir);

const getIframeContent = (content) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>demo</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="description" content="Description">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

        </head>

        <body>
           ${content}
        </body>

        </html>
    `;
};

module.exports = () => {
    const files = readdir(docDir);
    const filteredFiles = [];

    // 过滤文件，只选取 md 文件
    files.forEach((filePath) => {
        if (/(\/_iframe)/.test(filePath)) {
            return;
        }

        if (path.extname(filePath) !== '.md') {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            return;
        }

        filteredFiles.push(filePath);
    });

    // 读取 md 文件内容，动态生成 iframe
    filteredFiles.forEach((filePath) => {
        const content = fs.readFileSync(filePath, 'utf8');

        let finalContent = content;

        var reg = /(\<\!\-\-\sexecutable\s\-\-\>)([\s\n]*?)(\`\`\`\w*\n)([\s\S]*?)(\`\`\`)/g;
        var result = content.match(reg);

        if (result) {
            // 清空所有的 iframe 引入代码
            finalContent = finalContent.replace(/\[\]\([\s\S]*?\:include\'\)/g, '');
            result.forEach((matchedStr, index) => {

                // 动态生成 iframe 文件
                const originStr = matchedStr.replace(/\`\`\`\w*\n/, '').replace(/\`\`\`$/, '');

                const relativePath = filePath.replace(root, '');
                const iframeFileName = relativePath.replace(/\//g, '-').replace(/\.md$/, `-${index}.html`);

                const targetIframeFile = path.join(targetIframeDir, iframeFileName);

                fse.ensureFileSync(targetIframeFile);

                fse.writeFileSync(targetIframeFile, getIframeContent(originStr));

                // 在 md 中写入引入代码
                finalContent = finalContent.replace('<!-- executable -->', `[](${relative(filePath, targetIframeFile)} ':include')\n\n<!-- executable -->`);

                fs.writeFileSync(filePath, finalContent);
            });
        }
    });
};
