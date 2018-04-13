const path = require('path');
const chokidar = require('chokidar');

const watcher = chokidar.watch(path.join(__dirname, '../../docs'), {
    persistent: true,
    ignored: /(\.ds_store)|(node_modules)|(stats\.json)/i,
});

const root = path.join(__dirname, '../..');

function build() {
    require('child_process').execSync(`cd ${root} && npm run build`);
}

// listeners
watcher.on('ready', (file) => {
    watcher.on('add', (file) => {
        console.log('add: ', file);
        build();
    });
    watcher.on('unlink', (file) => {
        console.log('unlink: ', file);
        build();
    });
    watcher.on('unlinkDir', (file) => {
        console.log('unlinkDir: ', file);
        build();
    });
});

