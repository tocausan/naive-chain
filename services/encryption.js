let crypto = require('crypto'),
    config = require('../config');

module.exports = {

    encrypt(content, password) {
        let cipher = crypto.createCipher(config.security.algorithm, password),
            crypted = cipher.update(content, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt(content, password) {
        let decipher = crypto.createDecipher(config.security.algorithm, password),
            dec = decipher.update(content, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

};