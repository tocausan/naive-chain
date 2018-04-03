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

        this.isDeviceConnectedService()
            .then(res => {
                console.log(res);
                this.device.isConnected = res;

                //this.initDeviceService().then(res => console.log(res.data)).catch(e => console.log(e));
                this.getAllBlocksService().then(res => {
                    console.log(res.data);
                    this.blocks = res.data;
                }).catch(e => console.log(e));
                //this.getOneBlockService().then(res => this.block = res.data).catch(e => console.log(e));
                this.createBlockService().then(res => this.block = res.data).catch(e => console.log(e));
                //this.validateBlockService().then(res => this.blockValidation = res.data).catch(e => console.log(e));
                this.checkChainService().then(res => this.chain = res.data).catch(e => console.log(e));
                this.getChainDevicesService().then(res => this.chainDevices = res.data).catch(e => console.log(e));
            }, () => {
                this.device.isConnected = false;
                this.errors.push('Device no connected to database');
            });
    },
    methods: {

        isDeviceConnectedService: () => {
            return axios.post('/api/device/connected', {});
        },
        initDeviceService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/device/init', {})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        getAllBlocksService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/all', {})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        getOneBlockService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/one', {hash: ''})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        createBlockService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/block/create', {block: {}})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
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
                        reject(e);
                    });
            });
        },
        getChainDevicesService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/chain/devices', {})
                    .then(response => {
                        resolve(response)
                    })
                    .catch(e => {
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