const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.resolve("../client/index.html"), function (err) {
    if (err) {
        console.log('something bad happened', err);
    } else {
        console.log('Sent:', path.resolve("../client/index.html"));
    }
    })
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.resolve("../client/style.css"), function (err) {
    if (err) {
        console.log('something bad happened', err);
    } else {
        console.log('Sent:', path.resolve("../client/style.css"));
    }
    })
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
