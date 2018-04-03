const chalk = require('chalk');

module.exports = class Debug {

    constructor() {
    };

    static info(d) {
        console.log(chalk.greenBright(chalk.underline.dim('info'), JSON.stringify(d)));
    };

    static data(d) {
        console.log(chalk.blueBright(chalk.underline.dim('data'), JSON.stringify(d)));
    };

    static warn(d) {
        console.log(chalk.yellowBright(chalk.underline.dim('warn'), JSON.stringify(d)));
    };

    static error(d) {
        console.log(chalk.redBright(chalk.underline.dim('error'), JSON.stringify(d)));
    };

};