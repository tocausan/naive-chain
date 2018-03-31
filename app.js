let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes');

const app = express()
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'jade')
    //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/', routes);


const server = require('http').createServer(app),
    io = require('socket.io')(server);

server.listen(3100, "127.0.0.1");

io.on('connection', (socket) => {
    console.log('io on connection')
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

module.exports = app;