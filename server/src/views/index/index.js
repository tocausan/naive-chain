class Block {
    constructor(data) {
        this.index = data.index;
        this.timestamp = data.timestamp;
        this.data = data.data;
        this.target = data.target;
        this.nonce = data.nonce;
        this.prevHash = data.prevHash;
        this.currHash = data.currHash;
    }
}

const app = new Vue({
    el: '.app',
    data: {
        title: 'Naive Chain',
        user: {},
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
        this.getAllBlocksService()
            .then(res => {
                console.log(res);
                this.blocks = res;
            });
        this.createBlockService()
            .then(res => {
                console.log(res);
                this.block = res;
            });
        this.getOneBlockService('e1hexX9XYlOiwXl9BtHgU38vk3tBLVmMh1i+8oRtqzRtuOYMUb+4cnjAvNHqndvjRxo0znaiofGBiByUXAPwzw==')
            .then(res => {
                console.log(res);
                this.block = res;
            });
        //this.validateBlockService().then(res => this.blockValidation = res.data).catch(e => console.log(e));
        //this.checkChainService().then(res => this.chain = res.data).catch(e => console.log(e));
        //this.getChainDevicesService().then(res => this.chainDevices = res.data).catch(e => console.log(e));
    },
    methods: {
        getAllBlocksService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/all', {})
                    .then(res => {
                        resolve(res.data.map(i => new Block(i)))
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        getOneBlockService: (hash) => {
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
        createBlockService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/create', {block: {}})
                    .then(res => {
                        resolve(new Block(res.data));
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        validateBlockService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/validate', {block: {}})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        checkChainService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/chain/check', {})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        console.log(e);
                        reject(e);
                    });
            });
        },
        socket: () => {
            const socket = io(this.websocket.url);
            socket.on('connection', (data) => {
                this.websocket.isConnected = data;
                socket.emit('connection-feedback', {id: this.user.id});

                socket.on('ping', () => {
                    socket.emit('ping-feedback', {id: this.user.id});
                });
            });
        }
    }
});