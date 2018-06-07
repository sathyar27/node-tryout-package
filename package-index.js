'use strict';

const fs = require('fs');
const chalk = require('chalk');

const getDependencies = ((x) => {
    return x.dependencies;
})

// const colorDependencies = ((x) => {  
//     Object.entries(x).forEach(element => {
//         console.log(chalk.red(element[0])," : ", chalk.blue(element[1]))
//     });
  
// })

const colorDependencies = ((x) => {  
    Object.entries(x).forEach(([key , value]) => {
        console.log(chalk.red(key)," : ", chalk.blue(value))
    });
  
})

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