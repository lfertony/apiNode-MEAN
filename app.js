
//IMPORT EXPRESS
const express = require('express');
//START EXPRESS
const app = express();

//IMPORT MONGOOSE AND BODY PARSER
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//SER AN URL TO DB CONNECTION WITH MONGODB
const url = 'mongodb+srv://user_admin:6ZWL6sqx6988iHF@cluster0-qqt96.mongodb.net/test?retryWrites=true&w=majority';

//SET CONNECTIONS OPTIONS
const options = {
    reconnectTries: Number.MAX_VALUE, 
    reconnectInterval: 500,
    poolSize: 5,
    userNewUrlParser: true
};

//START A MONGOOSE CONNNECTION AND SET DEFAULT OPTION TO AVOID CONSOLE ERRO
mongoose.connect(url,options);
mongoose.set('useCreateIndex', true);

//SET AN ERROR FUNCTION CONNECTION FROM MONGOOSE
mongoose.connection.on('error' , (err) => {
    console.log('A dabata base error has been found: ' + err);
});

//SET A DISCONNECTION ALERT FUNCTOION FROM MONGOOSE
mongoose.connection.on('disconnected', () => {
    console.log('App has been disconnected: ')
});

//SET A CONNECTION ALERT FUNCTION
mongoose.connection.on('connected', () => {
    console.log('APP has been connected successfully');
})

//SET BODY PARSER
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//IMPORTE ROUTES FILES
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//SET ROUTES FROM OUR APP
app.use('/', indexRoute);
app.use('/users', usersRoute);
//SET SERVER TO LISTEN
app.listen(3000);

//EXPORT THIS MODULE
module.exports = app;