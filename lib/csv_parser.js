const csv = require('csvtojson'),
    fs = require('fs');

module.exports = class CsvParser {

    constructor(filePath) {
        this.data = {};
        this.setFilePath(filePath);
    }
    
    setFilePath(filePath) {
        if (fs.existsSync(filePath)) {
            this.filePath = filePath;
        }
    }

    async parse() {
        return await csv().
            fromFile(this.filePath);
    }

}