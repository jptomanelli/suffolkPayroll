const settings = Object.freeze(require('../settings')),
    CsvParser = require(`${settings.ROOT_DIR}/lib/csv_parser`),
    fs = require('fs'),
    Sequelize = require('sequelize'),
    Models = require(`${settings.ROOT_DIR}/models`),
    Employee = Models.Employee,
    EmployeeJobHistory = Models.EmployeeJobHistory;

class SalaryImporter {
    constructor(settings) {
        this.parser = new CsvParser(settings.SALARIES_CSV_PATH);
    }

    async import () {
        const salaryData = await this.parser.parse();
        for (let i in salaryData) {
            const data = salaryData[i];
            try {
                if (!data.FIRST_NAME) break;

                const employee = await Employee.create({
                    first_name: data.FIRST_NAME,
                    last_name: data.LAST_NAME,
                });

                const jobHistory = await EmployeeJobHistory.create({
                    year: data.YEAR_,
                    department: data.DEPARTMENT,
                    title: data.JOB_TITLE,
                    bargining_unit_num: data.BARGINING_UNIT_NUM,
                    salary: data.SALARY,
                    overtime_pay: data.OVERTIME_PAY,
                    total_earnings: data.TOTAL_EARNINGS,
                    hire_date: data.HIRE_DATE ? new Date(data.HIRE_DATE) : null,
                    terminate_date: data.TERMINATE_DATE ? new Date(data.TERMINATE_DATE) : null,
                    terminate: data.TERMINATE,
                    employee_id: employee.id
                });

            } catch (err) {
                console.log(data.TERMINATE_DATE);
                console.error(err);
                process.exit();
            }
        }
    }

}

(new SalaryImporter(settings))
.import();
process.exit();