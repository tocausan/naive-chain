const app = require('../app'),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    moment = require('moment');
Debug = require('../models').Debug;

server.listen(3100, "127.0.0.1");

const connections = [];

io.on('connection', (socket) => {
    onConnectionFeedback(socket);
    onPingFeedback(socket);
    onDisconnecting(socket);
    onError(socket);
    socket.emit('connection', {hello: 'world'});
});

function onConnectionFeedback(socket) {
    socket.on('connection-feedback', (data) => {
        const connection = connections.filter(c => c.id = data.id)[0];
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

function onPingFeedback(socket) {
    socket.on('ping-feedback', (data) => {
        const connection = connections.filter(c => c.id = data.id)[0];
        if (connection !== null || connection !== undefined) {
            connection.pings.push(moment.utc(moment.now()))
        } else {
            Debug.error('ping feedback from non-registered user: ' + data);
        }
    });
}

function onDisconnecting(socket) {
    socket.on('disconnecting', () => {
        socket.emit('ping');
    })
}

function onError(socket) {
    socket.on('error', (data) => {
        Debug.error(data);
    });
}