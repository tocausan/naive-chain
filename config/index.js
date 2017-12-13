module.exports = {
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
    }
};
