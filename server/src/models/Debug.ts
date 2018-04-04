const chalk = require('chalk');

export class Debug {

    static info(data: any) {
        console.log(chalk.greenBright(chalk.underline.dim('info'), data));
    };

    static data(data: any) {
        console.log(chalk.blueBright(chalk.underline.dim('data'), data));
    };

    static warn(data: any) {
        console.log(chalk.yellowBright(chalk.underline.dim('warn'), data));
    };

    static error(data: any) {
        console.log(chalk.redBright(chalk.underline.dim('error'), data));
    };

};