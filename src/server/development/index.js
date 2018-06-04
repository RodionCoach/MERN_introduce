//import {express, path, app, port} from "./config.js";

import path from 'path';
import express from 'express';
import {port} from './config';
import log from 'winston';

const app = express();

app.use(express.static(path.resolve('./src/client/css')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("./src/client/index.html"), function (err) {
    if (err) {
        log.error('something bad happened', err);
    } else {
        log.info('Sent:', path.resolve("./src/client/index.html"));
    }
    })
});

app.listen(port, (err) => {
    if (err) {
        log.error('something bad happened', err)
    }
    log.info(`server is listening on ${port}`)
});
