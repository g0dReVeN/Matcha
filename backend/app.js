const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require("morgan");
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const mongodb_uri = process.env.ATLAS_URI;

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

app.use(authRouter);
app.use('/admin', adminRouter);

mongoose
    .connect(mongodb_uri,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(() => {
        console.log("Mongodb successfully connected to 'Matcha' database!");
    })
    .catch(err => {
        console.log("Error connecting to database: " + err);
    });

app.listen(port, () => {
    console.log("Server is listening on port: ", port);
});