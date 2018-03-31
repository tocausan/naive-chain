const chalk = require('chalk');

module.exports = class Debug {

    constructor() {
    };

    static error(err) {
        console.log(chalk.redBright(JSON.stringify(err)));
    };

};