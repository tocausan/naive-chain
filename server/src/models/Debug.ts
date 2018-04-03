const chalk = require('chalk');

export class Debug {

    static checkJson(data: any) {
        try {
            return JSON.stringify(JSON.parse(data));
        }
        catch (e) {
            console.log('invalid json');
            console.log(e);
        }
    }

    static info(data: any) {
        const message = this.checkJson(data);
        console.log(chalk.greenBright(chalk.underline.dim('info'), message));
    };

    static data(data: any) {
        const message = this.checkJson(data);
        console.log(chalk.blueBright(chalk.underline.dim('data'), message));
    };

    static warn(data: any) {
        const message = this.checkJson(data);
        console.log(chalk.yellowBright(chalk.underline.dim('warn'), message));
    };

    static error(data: any) {
        const message = this.checkJson(data);
        console.log(chalk.redBright(chalk.underline.dim('error'), message));
    };

};