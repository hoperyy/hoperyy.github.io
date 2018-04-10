# Node 文件操作

+   utime

    ```javascript
    function utime(filepath) {
        const fs = require('fs');
        
        const newTime = ((Date.now() - (10 * 1000))) / 1000;
        fs.utimesSync(filepath, newTime, newTime);
    }
    ```

+   writeFileSync

    ```javascript
    function writeFileSync(filepath, content) {
        const fs = require('fs');

        const fd = fs.openSync(filepath, 'w+');
        fs.writeFileSync(filepath, content);
        fs.closeSync(fd);
    }
    ```