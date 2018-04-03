"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = {
    database: {
        path: 'mongodb://localhost:27017/naive-chain',
        collections: {
            blocks: 'blocks',
            devices: 'devices'
        }
    },
    encryption: {
        binary: 'base64',
        algorithm: 'aes192',
        hash: 'sha512',
        iterations: 16
    },
    app: {
        port: '3000',
        version: 1,
        path: '/api/1'
    },
};
//# sourceMappingURL=config.js.map