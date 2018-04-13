const path = require('path');
const chokidar = require('chokidar');

const watcher = chokidar.watch(path.join(__dirname, '../../docs'), {
    persistent: true,
    ignored: /(\.git)|(\.ds_store)|(node_modules)|(stats\.json)/i,
});

const root = path.join(__dirname, '../..');

function build() {
    require('child_process').execSync(`cd ${root} && npm run build`);
}

// listeners
watcher.on('add', build);
watcher.on('unlink', build);
watcher.on('unlinkDir', build);
