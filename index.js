'use strict';

const fs = require('fs');

console.log('This is after the read call');  

function myPackageFunc(packageData) {
    return new Promise((resolve, reject) => {
        fs.readFile(packageData, (err, data) => {  
            if (err) { reject(err); }
            else {                
                resolve(data);
            }
        });
    })
}

myPackageFunc("package.json").then(JSON.parse).then(getDependencies).then(colorDependencies).catch(function(err) {
    console.log(err)
})