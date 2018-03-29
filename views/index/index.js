const app = new Vue({
    el: '.app',
    data: {
        title: 'Naive Chain',
        blocks: [],
        currentBlock: {},
        blockValidation: null,
        chain: null,
        chainDevices: [],
    },
    mounted() {
        this.initAppService().then(res => console.log(res.data)).catch(e => console.log(e));
        this.getAllBlocksService().then(res => this.blocks = res.data).catch(e => console.log(e));
        this.getOneBlockService().then(res => this.block = res.data).catch(e => console.log(e));
        this.createBlockService().then(res => this.block = res.data).catch(e => console.log(e));
        this.validateBlockService().then(res => this.blockValidation = res.data).catch(e => console.log(e));
        this.checkChainService().then(res => this.chain = res.data).catch(e => console.log(e));
        this.getChainDevicesService().then(res => this.chainDevices = res.data).catch(e => console.log(e));
    },
    methods: {
        initAppService: () => {
            return new Promise((resolve, reject) => {
                axios.post('/api/init', {})
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