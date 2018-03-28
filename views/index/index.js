const app = new Vue({
    el: '.app',
    data: {
        title: 'title'
    },
    mounted() {
        this.initAppService().then(res => console.log(res));
        this.getAllBlocksService().then(res => console.log(res));
        this.getOneBlockService().then(res => console.log(res));
        this.createBlockService().then(res => console.log(res));
        this.validateBlockService().then(res => console.log(res));
        this.checkChainService().then(res => console.log(res));
        this.getChainDevicesService().then(res => console.log(res));
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