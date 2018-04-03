"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
class Debug {
    static checkJson(data) {
        try {
            return JSON.stringify(JSON.parse(data));
        }
        catch (e) {
            console.log('invalid json');
            console.log(e);
        }
    }
    static info(data) {
        const message = this.checkJson(data);
        console.log(chalk.greenBright(chalk.underline.dim('info'), message));
    }
    ;
    static data(data) {
        const message = this.checkJson(data);
        console.log(chalk.blueBright(chalk.underline.dim('data'), message));
    }
    ;
    static warn(data) {
        const message = this.checkJson(data);
        console.log(chalk.yellowBright(chalk.underline.dim('warn'), message));
    }
    ;
    static error(data) {
        const message = this.checkJson(data);
        console.log(chalk.redBright(chalk.underline.dim('error'), message));
    }
    ;
}
exports.Debug = Debug;
;
//# sourceMappingURL=Debug.js.map