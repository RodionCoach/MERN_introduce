//import {express, path, app, port} from "./config.js";

const config = require('./config');
const express = config.express;
const path = config.path;
const app = config.app;
const port = config.port;

app.use(express.static(path.resolve('../client/css')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("../client/index.html"), function (err) {
    if (err) {
        console.log('something bad happened', err);
    } else {
        console.log('Sent:', path.resolve("../client/index.html"));
    }
    })
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
