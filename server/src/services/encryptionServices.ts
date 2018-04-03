import * as crypto from 'crypto';
import {Config} from "../config";

const binary: any = Config.encryption.binary,
    algorithm = Config.encryption.algorithm,
    hash = Config.encryption.hash,
    iterations = Config.encryption.iterations;

export const EncryptionServices = {

    randomSecret(length: number) {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            secret = '';
        for (let i = 0; i < length; i++)
            secret += characters.charAt(Math.floor(Math.random() * characters.length));
        return secret;
    },

    hash(secret: string) {
        let hash = secret;
        for (let i = 0; i < iterations; i++)
            hash = crypto.createHmac('sha512', hash)
                .update('I love cupcakes')
                .digest(binary);
        return hash;
    },

    encrypt(content: string, password: string) {
        let cipher = crypto.createCipher(algorithm, password),
            crypted = cipher.update(content, 'utf8', binary);
        crypted += cipher.final(binary);
        return crypted;
    },

    decrypt(content: string, password: string) {
        let decipher = crypto.createDecipher(algorithm, password),
            dec = decipher.update(content, binary, 'utf8');
        dec += decipher.final(binary);
        return dec;
    }

};