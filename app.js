const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 8080;

const auth = require('./Middleware/auth');
const content = require('./Middleware/content');
const dburl = require('./secret/secret.json');
const path = require("path");
const fs = require('fs');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    next();
})

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', auth);
app.use('/content', content);

mongoose
    .connect(dburl.dburl, {dbName: "Clon"})
    .then(() => {
        console.log('DB Connected Successful')
        const server = app.listen(port);
        const io = require('socket.io')(server);
        io.on('connection', socket => {
            console.log('[Ready] Listening for Socket (Client Connected)');
        })
        console.log('[Ready] Listening for Back End ' + port);
    })
    .catch(err => {
        console.log(err);
    })