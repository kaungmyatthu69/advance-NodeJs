const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const app = express();
process.env.UV_THREADPOOL_SIZE = 1;
// Is the file being executed in master mode?
if(cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    cluster.fork();
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();

}else {
    // function doWork(duration){
    //     const start = Date.now();
    //     while(Date.now() - start < duration){
    //     }
    // }
    app.get('/',(req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        })

    });
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    })
}
