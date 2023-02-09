// dependencies
const path = require("path")
const fs = require("fs")

// module scaffolding
const lib = {}
// base directory of the data folder
lib.basedir = path.join(__dirname + "/../.data/")
// write data to file
lib.create = (dir, file, data, callback) => {
    //   open file for writing 
    fs.open(`${lib.basedir + dir}/${file}.json`, `wx`, (err1, fileDescriptator) => {
        if (err1 && fileDescriptator) {
            //    convert data to string 
            const strringData = JSON.stringify(data)
            // write data to file and then close it 
            fs.writeFile(fileDescriptator, strringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptator, (err3) => {
                        if (!err3) {
                            callback(false)
                        }
                        else {
                            callback("Error closing the new file")
                        }
                    })
                }
                else {
                    callback("Error writing to ne file")
                }
            })
        }
        else {
            callback("could not craete file it may alrady exist")
        }
    })
}
module.exports = lib

