import * as http from 'http';
import * as io from 'socket.io';
import * as moment from 'moment';
import {App} from '../app';
import {Debug} from '../models';

export const Socket: any = http.createServer(App)
    .listen(3100, "127.0.0.1");

const connections: any[] = [];

/*
io.on('connection', (socket: io.Socket) => {
    onConnectionFeedback(socket);
    onPingFeedback(socket);
    onDisconnecting(socket);
    onError(socket);
    socket.emit('connection', {hello: 'world'});
});
*/

function onConnectionFeedback(socket: io.Socket) {
    socket.on('connection-feedback', (data) => {
        const connection: any = connections.filter((c: any) => c.id = data.id)[0];
        if (connection === null || connection === undefined) {
            connections.push({
                id: data.id,
                dates: [moment.utc(moment.now())],
                pings: []
            })
        } else {
            connection.dates.push(moment.utc(moment.now()))
        }
        Debug.info(connections);
    });
}

function onPingFeedback(socket: io.Socket) {
    socket.on('ping-feedback', (data) => {
        const connection: any = connections.filter((c: any) => c.id = data.id)[0];
        if (connection !== null || connection !== undefined) {
            connection.pings.push(moment.utc(moment.now()))
        } else {
            Debug.error('ping feedback from non-registered user: ' + data);
        }
    });
}

function onDisconnecting(socket: io.Socket) {
    socket.on('disconnecting', () => {
        socket.emit('ping');
    })
}

function onError(socket: io.Socket) {
    socket.on('error', (data) => {
        Debug.error(data);
    });
}