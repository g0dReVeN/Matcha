const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require("morgan");
const session = require('express-session');
const MongoBDStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const app = express();

const store = new MongoBDStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

app.use(session(
    {
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

mongoose
    .connect(uri,
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