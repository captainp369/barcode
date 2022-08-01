const fs = require("fs");

// const { genBarcode } = require("./genBarcode"); // in pixel
const { genBarcode } = require("./genBarcode2"); // in cm

fs.readFile("test.log", 'utf8', function(err,data) {
    if(err) throw err;
    let splitted = data.toString().split("\n");
    
    for (let i=0;i<splitted.length;i++) {
        genBarcode(splitted[i].substring(0,4)+i,splitted[i])
    }

})

// for(var i = 0; i < 2;i++) {
//     genBarcode(i,"01529922012400990497"+i)
// }