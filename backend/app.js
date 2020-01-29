const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require("morgan");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const User = require('./models/user');

const app = express();

const port = process.env.PORT;
const mongodb_uri = process.env.ATLAS_URI;

const store = new MongoDBStore({
    uri: mongodb_uri,
    collection: 'sessions'
});

app.use(session(
    {
        cookie: { maxAge: 1000 * 60 * 60 },
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    }
));

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

app.use(authRouter);
app.use('/admin', adminRouter);

mongoose.connect(mongodb_uri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Mongodb successfully connected to 'Matcha' database!");
});

app.listen(port, () => {
    console.log("Server is listening on port: ", port);
});

exports.connection = connection;