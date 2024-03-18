//explain os operations
const https = require('https');
const crypto = require('crypto');
const start = Date.now();
const fs = require('fs');
process.env.UV_THREADPOOL_SIZE = 5;
function doRequest(){
    https.request('https://www.google.com', res => {
        res.on('data', () => { });
        res.on('end', () => {
            console.log(Date.now() - start);
        });
    }).end();

}


function doHash(){

    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    })
}

doRequest();

fs.readFile('multitasks.js', 'utf8', () => {
    console.log('FS:', Date.now() - start);
})
doHash()
doHash()
doHash()
doHash()

// https://www.notion.so/NodeJs-Stephen-Grider-4a063488c4a04e02831e15adc42bb44a