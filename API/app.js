const express = require('express');
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session);

const app = express();

const {mongoose} = require('./db/mongoose');

const port = 3000;
const mongoUri = 'mongodb://localhost:27017/management';

const store = new MongoDbSession(
    {
        uri: mongoUri,
        collection: "mySessions",

    }
);

//Load mongoose models
const users = require('./routes/users');
const lists = require('./routes/lists');
const tasks = require('./routes/tasks');

const jwt = require('jsonwebtoken');
const passport = require('passport');

//Authorization
const isAuth = (req, res, next) => {
    if(req.session.isAuth)
    {
        next()
    }
    else{
        res.sendSatus(401);
    }
}


/* MIDDLEWARE  */

// express-session middlewear
app.use(session({
    secret: 'Key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}));
// Load middleware
app.use(express.json());

app.use('/users', users);
app.use('/lists', lists);
app.use('/lists', tasks);

// CORS HEADERS MIDDLEWARE

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//Start Server
app.listen(port, () => {
    console.log('Server is listening on Port: ' + port);
});
