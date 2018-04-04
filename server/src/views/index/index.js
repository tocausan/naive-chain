const moment = require('moment');

class Block {
    constructor(data) {
        this.index = data.index;
        this.timestamp = data.timestamp;
        this.data = data.data;
        this.target = data.target;
        this.nonce = data.nonce;
        this.prevHash = data.prevHash;
        this.currHash = data.currHash;
        this.qrCode = data.qrCode;

        this.date = moment.unix(this.timestamp);
    }
}

const app = new Vue({
    el: '.app',
    data: {
        title: 'Naive Chain',
        api: {},
        blocks: [],
        currentBlock: {},
        blockValidation: null,
        chain: null,
        device: {},
        chainDevices: [],
        errors: [],

        websocket: {
            url: 'http://localhost:3100',
            isConnected: false
        },
        socketMessage: ''
    },
    mounted() {
        this.getApi()
            .then(api => {
                console.log(api);
                this.api = api;
            });
        this.getAllBlocks()
            .then(blocks => {
                this.blocks = blocks.reverse();
            });
    },
    methods: {
        getApi: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api', {})
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        getAllBlocks: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/all', {})
                    .then(res => {
                        resolve(res.data.map(i => new Block(i)));
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        getOneBlock: (hash) => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/one', {hash: hash})
                    .then(res => {
                        resolve(new Block(res.data));
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        createBlock: (block) => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/create', {block: block})
                    .then(res => {
                        resolve(new Block(res.data));
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        checkChain: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/chain/check', {})
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        }
    }
});