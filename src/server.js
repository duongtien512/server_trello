import express from 'express';
import {connectDB} from '*/config/mongodb';
import {env} from '*/config/env';
import { BoardModel } from '*/models/board.model'

connectDB()
    .then(() => console.log('Connected successfully to Database server!'))
    .then(() => bootServer())
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })

const bootServer = () => {
    const app = express();

    app.get('/test', async(req, res) => {
        res.end('<h1>Hello</h1>')
    });
    
    app.listen(env.APP_PORT, env.APP_HOST , () => {
        console.log(`Server running at ${env.APP_HOST}:${env.APP_PORT}`);
    });
}