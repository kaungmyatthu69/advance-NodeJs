const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;
// process.env.UV_THREADPOOL_SIZE = 1;
// Is the file being executed in master mode?
// if(cluster.isMaster) {
    // Cause index.js to be executed *again* but in child mode
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();

// }else {
    // function doWork(duration){
    //     const start = Date.now();
    //     while(Date.now() - start < duration){
    //     }
    // }
    // app.get('/',(req, res) => {
    //     crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    //         res.send('Hi there');
    //     })
    //
    // });
    // app.listen(3000, () => {
    //     console.log('Listening on port 3000');
    // })
// }

// using pm2 cluster management
// app.get('/',(req, res) => {
//     crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//         res.send('Hi there');
//     })
// });
//
// app.listen(3000, () => {
//     console.log('Listening on port 3000');
// })

// using webworker_threads

app.get('/',(req,res)=>{
    const worker = new Worker(function (){
        this.onmessage= function (){
            let counter = 0;
            while (counter < 1e9){
                counter++
            }
            postMessage(counter)

        }
    })

    worker.onmessage=function (myCounter){
        console.log(myCounter)
    }
    worker.postMessage()
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})