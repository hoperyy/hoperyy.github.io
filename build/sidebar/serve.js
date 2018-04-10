const path = require('path');
const chokidar = require('chokidar');

const writeSidebar = require('./_write');

console.log(path.join(__dirname, '../../docs'));

const watcher = chokidar.watch(path.join(__dirname, '../../docs'), {
    persistent: true,
    ignored: /(\.git)|(\.ds_store)|(node_modules)|(stats\.json)/i,
});

// listeners
watcher.on('add', (file) => {
    console.log('add: ', file);
    writeSidebar();
});
watcher.on('unlink', (file) => {
    console.log('unlink: ', file);
    writeSidebar();
});
watcher.on('unlinkDir', (file) => {
    console.log('unlinkDir: ', file);
    writeSidebar();
});

console.log(watcher.getWatched());