export const Config = {
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
        name:'naive-chain-API',
        ip: '192.168.1.24',
        port: 3000,
        version: 1,
        path: '/api/1'
    },
};
