//import {express, path, app, port} from "./config.js";

import path from 'path';
import express from 'express';
import {port} from './config';
console.log();
const app = express();

app.use(express.static(path.resolve('./src/client/css')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("./src/client/index.html"), function (err) {
    if (err) {
        console.log('something bad happened', err);
    } else {
        console.log('Sent:', path.resolve("./src/client/index.html"));
    }
    })
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
