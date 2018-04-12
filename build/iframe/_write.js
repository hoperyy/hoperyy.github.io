const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const readdir = require('recursive-readdir-sync');
const readFileTree = require('directory-tree');
const relative = require('relative');

const root = path.join(__dirname, '../../');
const docDir = path.join(root, 'docs');

const targetIframeDir = path.join(docDir, '_iframe');

fse.ensureDirSync(targetIframeDir);

// 清空 _iframe 目录，同时复制模板目录的非 md 文件到该目录
fs.readdirSync(targetIframeDir).forEach((fileName) => {
    // 删除 .html / .md 文件
    if (/(\.html)|(\.md)$/.test(fileName)) {
        fse.removeSync(path.join(targetIframeDir, fileName));
    }

    // 复制 imgs 目录到 _iframe 目录
    // fse.copySync(path.join(docDir, 'imgs'), path.join(targetIframeDir, 'imgs'));
});

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
            <style>
            html, body {
                height: 100%;
            }
            </style>
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

    // 读取 md 文件内容，动态生成 iframe 使用的 html 文件 和 iframe 代码
    const iframeStaticMap = {};
    filteredFiles.forEach((filePath) => {
        const content = fs.readFileSync(filePath, 'utf8');

        let finalContent = content;

        var reg = /(\<\!\-\-\srun\s\-\-\>)([\s\n]*?)(\`\`\`\w*\n)([\s\S]*?)(\`\`\`)/g;
        var result = content.match(reg);

        if (result) {
            // 清空所有的 iframe 引入代码
            finalContent = finalContent.replace(/\[\]\([\s\S]*?\:include[\s\S]*?\'\)/g, '<!--tempreading-->').replace(/(\<\!\-\-tempreading\-\-\>)([\n\t\s]*)/g, '');
            
            let lastStr = '';
            let leftStr = finalContent;
            result.forEach((matchedStr, index) => {
                // 当前文件所属的目录地址（相对地址）
                const relativeDir = path.dirname(filePath).replace(docDir, '');

                // 将当前目录的静态资源复制到 _iframe 目录
                if (!iframeStaticMap[relativeDir]) {
                    iframeStaticMap[relativeDir] = true;
                    const srcImgDir = path.join(path.dirname(filePath), 'imgs');
                    const targetImgDir = path.join(targetIframeDir, relativeDir, 'imgs');
                    if (fs.existsSync(srcImgDir)) {
                        fse.copySync(srcImgDir, targetImgDir);
                    }
                }

                // 当前文件名称
                const fileName = path.basename(filePath);
                // 生成的 iframe 引用的 html 文件名称
                const iframeFileName = fileName.replace(/\.md$/, `-${index}.html`);
                // 生成的 iframe 引用的 html 文件路径
                const targetIframeFile = path.join(targetIframeDir, relativeDir,  iframeFileName);
                
                // 生成的 iframe 引用的 html 文件内容
                const originStr = matchedStr.replace(/\`\`\`\w*\n/, '').replace(/\`\`\`$/, '');

                // 动态生成 iframe 文件
                fse.ensureFileSync(targetIframeFile);
                fse.writeFileSync(targetIframeFile, getIframeContent(originStr));

                // 在 md 中写入引入代码
                leftStr = leftStr.replace('<!-- run -->', `[](${relative(filePath, targetIframeFile)} ':include data-id=${index}')\n\n<!-- run -->`);
                const endIndex = leftStr.indexOf(matchedStr) + matchedStr.length;
                lastStr += leftStr.substring(0, endIndex);
                leftStr = leftStr.substring(endIndex);
            });

            fs.writeFileSync(filePath, lastStr);
        }
    });

    // 复制静态资源，如 imgs 到
};
