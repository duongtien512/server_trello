import express from 'express';
import {connectDB} from '*/config/mongodb';
import {env} from '*/config/env';
import { apiV1 } from '*/routes/v1';

connectDB()
    .then(() => console.log('Connected successfully to Database server!'))
    .then(() => bootServer())
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })

const bootServer = () => {
    const app = express();

    //request body data
    app.use(express.json())

    // use APIs
    app.use('/v1', apiV1);
    
    app.listen(env.APP_PORT, env.APP_HOST , () => {
        console.log(`Server running at ${env.APP_HOST}:${env.APP_PORT}`);
    });
}