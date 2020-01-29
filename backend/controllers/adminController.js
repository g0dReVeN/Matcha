const User = require('../models/user');
const History = require('../models/history');
const Tags = require('../models/tags');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const transporter = require('../config/sendgrid');

exports.postProfile = (req, res, next) => {
    const gender = req.body.gender;
    const sexualPreference = req.body.sexualPreference;
    const biography = req.body.biography;
    const tags = req.body.tags

    /*
        Add section for disecting the tags object and creating an array
    */

    User.findById(req.user._id)
    .then(user => {

        /* Convert these to MongoDB 'Number' format */
        user.gender = gender;
        user.sexualPreference = sexualPreference;
        user.biography = biography;
        /**/

        user.completedProfile = true;
        user.save(err => {
            if (err) {
                return res.status(400).json('Error :' + err);
            }
            const newTags = new Tags({
                userId: req.user._id,
                tags: tags
            });
            newTags.save(err => {
                if (err) {
                    return res.status(400).json('Error adding tags: ' + err);
                }
                return res.status(200).json('User profile updated!');
            });
        });
    })
    .catch(err => {
        return res.status(400).json('Error: ' + err);
    });
}

exports.getUserObject = (req, res, next) => {
    return res.status(200).json({
        "username": req.user.username,
        "firstname": req.user.firstname,
        "lastname": req.user.lastname,
        "email": req.user.email,
        "age": req.user.age,
        "location": req.user.location,
        "fameRating": req.user.fameRating,
        "gender": req.user.gender,
        "sexualPreference": req.user.sexualPreference,
        "biography": req.user.biography,
    });
}

exports.postHistory = (req, res, next) => {
    const refId = req.body.refId;
    
    History.findOne({ "userId": req.user._id })
    .then(history => {
        history.historyList.push({$each: [req.user._id]});
        history.save(err => {
            if (err) {
                return res.status(400).json('Error adding history: ' + err);
            }
            return res.status(200).json('History added!');
        });
    })
    .catch(err => {
        return res.status(400).json('Error: ' + err);
    });
}