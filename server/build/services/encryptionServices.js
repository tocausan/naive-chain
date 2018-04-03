"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const config_1 = require("../config");
const binary = config_1.Config.encryption.binary, algorithm = config_1.Config.encryption.algorithm, hash = config_1.Config.encryption.hash, iterations = config_1.Config.encryption.iterations;
exports.EncryptionServices = {
    randomSecret(length) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', secret = '';
        for (let i = 0; i < length; i++)
            secret += characters.charAt(Math.floor(Math.random() * characters.length));
        return secret;
    },
    hash(secret) {
        let hash = secret;
        for (let i = 0; i < iterations; i++)
            hash = crypto.createHmac('sha512', hash)
                .update('I love cupcakes')
                .digest(binary);
        return hash;
    },
    encrypt(content, password) {
        let cipher = crypto.createCipher(algorithm, password), crypted = cipher.update(content, 'utf8', binary);
        crypted += cipher.final(binary);
        return crypted;
    },
    decrypt(content, password) {
        let decipher = crypto.createDecipher(algorithm, password), dec = decipher.update(content, binary, 'utf8');
        dec += decipher.final(binary);
        return dec;
    }
};
//# sourceMappingURL=encryptionServices.js.map