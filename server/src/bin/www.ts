import * as debug from 'debug';
import * as http from 'http';
import {Config} from '../config';
import {App} from '../app';

const port: number = Config.app.port as number;
App.set('port', Config.app.port);

const server = http.createServer(App)
    .listen(port)
    .on('error', (error: any) => {
        if (error.syscall !== 'listen') throw error;
        switch (error.code) {
            case 'EACCES':
                console.error('Port ' + port + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('Port ' + port + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .on('listening', () => {
        debug('Listening on ' + 'port ' + server.address().port);
    });

