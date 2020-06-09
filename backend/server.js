const express = require('express');
const cors = require('cors');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connecting to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// app.use(express.static(path.join(__dirname, '../public')));

var path = require('path');

// app.get('/',function(req,res){
//     res.sendFile(path.resolve(__dirname + '/../public/index.html')); 
// });

const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercise');

app.use('/user', userRouter);
app.use('/exercise', exerciseRouter);

app.listen(port, () => {
    console.log(`Here we go on port: ${port}`);
});