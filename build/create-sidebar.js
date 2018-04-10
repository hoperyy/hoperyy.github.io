const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const readdir = require('recursive-readdir-sync');

const docDir = path.join(__dirname, '../docs');
const sidebarFile = path.join(__dirname, '../_sidebar.md');

// 确认有 _sidebar.md
fse.ensureFileSync(sidebarFile);

const getLinkObjs = () => {
    const linkObjs = [];

    const absoluteFiles = readdir(docDir);

    absoluteFiles.forEach((filepath) => {
        const relativePath = filepath.replace(path.join(__dirname, '..') + '/', '');

        // 过滤掉 readme.md
        if (/README\.md$/i.test(relativePath)) {
            return;
        }

        // 只获取 md 文件
        if (!/\.md$/.test(relativePath)) {
            return;
        }

        const link = relativePath.replace(/\.md$/i, '');

        linkObjs.push({
            name: link.replace('docs/', ''),
            link
        });
    });

    return linkObjs;
};

const getSidebarContent = (linkObjs) => {
    const sidebarContent = [];
    linkObjs.forEach((item) => {
        sidebarContent.push(`+  [${item.name}](${item.link})`);
    });

    return sidebarContent.join('\n');
};

// 写入 sidebar
fs.writeFileSync(sidebarFile, getSidebarContent(getLinkObjs()));
