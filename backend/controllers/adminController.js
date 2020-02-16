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

    User.findById(req.session.user.id)
        .then(user => {

            /* Convert these to MongoDB 'Number' format */
            user.gender = gender;
            user.sexualPreference = sexualPreference;
            /**/
            user.biography = biography;
            
            user.completedProfile = true;
            user.save(err => {
                if (err) {
                    return res.status(400).json({ msg: 'Error', err });
                }
                const newTags = new Tags({
                    userId: req.user._id,
                    tags: tags
                });
                newTags.save(err => {
                    if (err) {
                        return res.status(400).json({ success: false, msg: 'Error', err });
                    }
                    return res.status(200).json({ success: true, msg: 'User profile updated!' });
                });
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, msg: 'Error', err });
        });
}

exports.getUserObject = (req, res, next) => {
    return res.status(200).json({
        success: false,
        msg: 'Successfully got user details.',
        userObj: {
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
        }
    });
}

exports.postHistory = (req, res, next) => {
    const refId = req.body.refId;
    console.log(req.session.user);

    History.findOne({ "userId": req.session.user.id })
        .then(history => {
            console.log("Found the history");
            history.historyList.push({ $each: [refId] });
            history.save(err => {
                if (err) {
                    return res.status(400).json({ success: false, msg: 'Error adding history', err });
                }
                return res.status(200).json({ success: true, msg: 'History added!' });
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, msg: 'Error', err });
        });
}