const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../../');
const docDir = path.join(root, 'docs');

const target = path.join(root, 'doc-auto-backup');

try {
    if (fs.existsSync(target)) {
        fse.removeSync(target);
    }
} catch(err) {

}

fse.copySync(docDir, target);