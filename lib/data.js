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
// raed the data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
        callback(err, data)
    })
}

// update the existing file
lib.update = (dir, file, data, callback) => {
    //open the file to write
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err1, fileDescriptator) => {
        if (!err1 && fileDescriptator) {
            //stringify the data
            const stringData = JSON.stringify(data)

            //truncate the file to replace the old data
            fs.ftruncate(fileDescriptator, (err2) => {
                if (!err2) {
                    // write the file and close it
                    fs.writeFile(fileDescriptator, stringData, (err3) => {
                        if (!err3) {
                            //   close the file 
                            fs.close(fileDescriptator, (err4) => {
                                if (!err4) {
                                    callback(false)
                                }
                                else {
                                    callback("Error occured to closing the file")
                                }
                            })
                        }
                        else {
                            callback("Error occured to write the file")
                        }
                    })
                }
                else {
                    callback("Error occured to truncate the file");

                }
            })
        }
        else {
            callback("Erro occured to updating the file, file may not exist");

        }
    })
}
module.exports = lib

