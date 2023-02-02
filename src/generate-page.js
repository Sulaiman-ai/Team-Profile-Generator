const fs = require("fs");

function writeToFile(data, OUTPUT_DIR, outputPath) {
    if (!fs.existsSync(OUTPUT_DIR)) {
    // synchronously create a directory
    fs.mkdirSync(OUTPUT_DIR);
    console.log('director ')
    }

    fs.writeFile(outputPath, data, err => {
        if (err) {
            console.error(err);
          }
    });
}

module.exports = writeToFile;


// check if output folder exists
// if not create output folder
// write the html file