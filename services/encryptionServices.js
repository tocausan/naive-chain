let crypto = require('crypto'),
    config = require('../config'),
    binary = config.encryption.binary,
    algorithm = config.encryption.algorithm,
    hash = config.encryption.hash,
    iterations = config.encryption.iterations;

module.exports = {

    randomSecret(length){
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            secret = '';
        for (let i = 0; i < length; i++)
            secret += characters.charAt(Math.floor(Math.random() * characters.length));
        return secret;
    },

    hash(secret){
        let hash = secret;
        for (let i = 0; i < iterations; i++)
            hash = crypto.createHmac('sha512', hash)
                .update('I love cupcakes')
                .digest(binary);
        return hash;
    },

    encrypt(content, password) {
        let cipher = crypto.createCipher(algorithm,),
            crypted = cipher.update(content, 'utf8', binary);
        crypted += cipher.final(binary);
        return crypted;
    },

    decrypt(content, password) {
        let decipher = crypto.createDecipher(algorithm, password),
            dec = decipher.update(content, binary, 'utf8');
        dec += decipher.final(binary);
        return dec;
    }

};