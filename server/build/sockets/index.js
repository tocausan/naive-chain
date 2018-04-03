"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const moment = require("moment");
const app_1 = require("../app");
const models_1 = require("../models");
exports.Socket = http.createServer(app_1.App)
    .listen(3100, "127.0.0.1");
const connections = [];
function onConnectionFeedback(socket) {
    socket.on('connection-feedback', (data) => {
        const connection = connections.filter((c) => c.id = data.id)[0];
        if (connection === null || connection === undefined) {
            connections.push({
                id: data.id,
                dates: [moment.utc(moment.now())],
                pings: []
            });
        }
        else {
            connection.dates.push(moment.utc(moment.now()));
        }
        models_1.Debug.info(connections);
    });
}
function onPingFeedback(socket) {
    socket.on('ping-feedback', (data) => {
        const connection = connections.filter((c) => c.id = data.id)[0];
        if (connection !== null || connection !== undefined) {
            connection.pings.push(moment.utc(moment.now()));
        }
        else {
            models_1.Debug.error('ping feedback from non-registered user: ' + data);
        }
    });
}
function onDisconnecting(socket) {
    socket.on('disconnecting', () => {
        socket.emit('ping');
    });
}
function onError(socket) {
    socket.on('error', (data) => {
        models_1.Debug.error(data);
    });
}
//# sourceMappingURL=index.js.map