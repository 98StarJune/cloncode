const express=require('express');
const app = express();
const mongoose = require('mongoose');


const port = 8080;

const auth = require('./Middleware/auth');
const dburl = require('./secret/secret.json')
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    next();
})
app.use(express.json());

app.use('/auth', auth);

mongoose.connect(dburl.dburl, {dbName: "Clon"})
.then(() =>{
    app.listen(port);
    console.log('DB Connected Successful')
})
.catch(err =>{
    console.log(err);
})