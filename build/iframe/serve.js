const path = require('path');
const chokidar = require('chokidar');

const write = require('./_write');

console.log(path.join(__dirname, '../../docs'));

const watcher = chokidar.watch(path.join(__dirname, '../../docs'), {
    persistent: true,
    ignored: /(\.git)|(\.ds_store)|(node_modules)|(stats\.json)/i,
});

// listeners
watcher.on('add', (file) => {
    console.log('add: ', file);
    write();
});
watcher.on('unlink', (file) => {
    console.log('unlink: ', file);
    write();
});
watcher.on('unlinkDir', (file) => {
    console.log('unlinkDir: ', file);
    write();
});

console.log(watcher.getWatched());