const settings = require('../settings'),
    CsvParser = require(`${settings.ROOT_DIR}/lib/csv_parser`),
    parser = new CsvParser(settings.SALARIES_CSV_PATH),
    axios = require('axios'),
    Utils = require(`${settings.ROOT_DIR}/lib/utils`),
    fs = require('fs');

module.exports = class DataBuilder {

    constructor(parser, outputFile) {
        this.parser = parser;
        this.outputFile = outputFile;
    }

    async build() {
        const salaryData = await parser.parse();

        for (let i in salaryData) {
            const name = salaryData[i].FIRST_NAME;

            let res;            
            try {
                res = await axios.get(`https://api.genderize.io/?name=${name}`);
            } catch (err) {
                console.log(err);
                const ms = (err.response.headers['X-Rate-Reset'] + 60) * 1000;

                console.log('Wait ' + ms / (60000) + 'mins');
                await Utils.sleep(ms);

                res = await axios.get(`https://api.genderize.io/?name=${name}`);
            }
            
            console.log(res.data);

            salaryData[i].NAME_INFO = res.data;
        }

        await fs.writeFileSync(
            this.outputFile,
            JSON.stringify(salaryData)
        );

    }
}