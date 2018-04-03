"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes_1 = require("./routes");
exports.App = express()
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'jade')
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/', routes_1.Routes);
//# sourceMappingURL=app.js.map