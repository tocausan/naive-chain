import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import {Routes} from "./routes";

export const App = express()
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'jade')
    //.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use('/', Routes);
