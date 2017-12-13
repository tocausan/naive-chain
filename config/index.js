module.exports = {
    database: {
        path: 'mongodb://localhost:27017/naive-chain',
        collections: {
            blocks: 'blocks'
        }
    },
    security: {
        algorithm: 'aes192'
    }
};
