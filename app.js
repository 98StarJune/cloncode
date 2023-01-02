const express=require('express');
const app = express();
const mongoose = require('mongoose');


const port = 8080;

const auth = require('./Middleware/auth');

app.use(express.json());

app.use('/auth', auth);

mongoose.connect('mongodb+srv://root:test12345@cluster0.mnsjiqy.mongodb.net/?retryWrites=true&w=majority', {dbName: "Clon"})
.then(() =>{
    app.listen(port);
    console.log('DB Connected Successful')
})
.catch(err =>{
    console.log(err);
})