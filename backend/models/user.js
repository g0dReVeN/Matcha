const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number
    },
    sexualPreference: {
        type: Number,
        default: '0'
    },
    biography: {
        type: String
    },
    completedProfile: {
        type: Boolean,
        default: false
    },
    resetToken: String,
    resetTokenExpiration: Date,
    activeStatus: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);