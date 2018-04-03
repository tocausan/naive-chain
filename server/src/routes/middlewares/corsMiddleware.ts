import {NextFunction, Request, Response} from "express";

export const Middleware = {
    cors: (req:Request, res:Response, next:NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //req.method === 'OPTIONS' ? res.sendStatus(200) : next();
        next();
    }
};