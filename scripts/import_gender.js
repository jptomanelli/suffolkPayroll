const settings = Object.freeze(require('../settings')),
    Models = require(`${settings.ROOT_DIR}/models`),
    axios = require('axios'),
    Employee = Models.Employee,
    utils = require(`${settings.ROOT_DIR}/lib/utils`);
    EmployeeJobHistory = Models.EmployeeJobHistory,
    Op = require('sequelize').Op;

class GenderImporter {

    async import() {
        let cont = true;
        while (cont) {
            cont = await this._import();
        }
        return cont;
    }

    async _import(limit = 10) {

        const employees = await Employee.findAll({
            limit: limit,
            attributes: [ 'id', 'first_name', 'gender', 'gender_prob' ],
            where: { gender: NULL }
        });

        let url = "https://api.genderize.io/?";

        employees.forEach((emp, i) => {
            let name = emp.first_name.split(' ')[0];
            url += name ? `name[${i}]=${name}&` : 'IDK';
        });

        url = url.slice(0, -1);

        const res = await this.getData(url);

        if (!res.success) {
            console.error("failed");
            return false;
        }

        console.log(res.data);
        const genderInfo = {};
        res.data.forEach(obj => {
            genderInfo[obj.name.toUpperCase()] = {
                gender: obj.gender ? obj.gender : 'unknown',
                gender_prob: obj.probability ? obj.probability : '0'
            }
        });

        employees.forEach(async emp => {
            let data = genderInfo[emp.first_name.split(' ')[0]];
            emp.gender = data.gender;
            emp.gender_prob = data.gender_prob;
            await emp.save();
        });

        return true;
    }

    async getData(url) {
        const fail = { sucess: false, data: null };
        let res;
        try {
            res = await axios.get(url);
        } catch (error) {
            return fail;
        }
        return res.data ? { success: true, data: res.data} : fail;
    }

}

const importer = new GenderImporter();
importer.import().then(res => {
    process.exit();
});
