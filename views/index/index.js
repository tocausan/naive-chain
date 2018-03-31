const app = new Vue({
    el: '.app',
    data: {
        title: 'Naive Chain',
        blocks: [],
        currentBlock: {},
        blockValidation: null,
        chain: null,
        device: {},
        chainDevices: [],
        errors: [],

        isConnected: false,
        socketMessage: ''
    },
    mounted() {
        const socket = io('http://localhost:3100');
        socket.on('news',  (data) =>{
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });

        this.isDeviceConnectedService()
            .then(res => {
                console.log(res);
                this.device.isConnected = res;
            }, () => {
                this.device.isConnected = false;
                this.errors.push('Device no connected to database');
            });

        if(this.device.isConnected){
            this.initDeviceService().then(res => console.log(res.data)).catch(e => console.log(e));
            this.getAllBlocksService().then(res => this.blocks = res.data).catch(e => console.log(e));
            this.getOneBlockService().then(res => this.block = res.data).catch(e => console.log(e));
            this.createBlockService().then(res => this.block = res.data).catch(e => console.log(e));
            this.validateBlockService().then(res => this.blockValidation = res.data).catch(e => console.log(e));
            this.checkChainService().then(res => this.chain = res.data).catch(e => console.log(e));
            this.getChainDevicesService().then(res => this.chainDevices = res.data).catch(e => console.log(e));
        }
    },
    sockets: {
        connect() {
            // Fired when the socket connects.
            this.isConnected = true;
        },

        disconnect() {
            this.isConnected = false;
        },

        // Fired when the server sends something on the "messageChannel" channel.
        messageChannel(data) {
            this.socketMessage = data
        }
    },
    methods: {
        pingServer() {
            // Send the "pingServer" event to the server.
            this.$socket.emit('pingServer', 'PING!')
        },
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
        }
    }
});