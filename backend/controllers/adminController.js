const User = require('../models/user');
const History = require('../models/history');
const UserImages = require('../models/images');

exports.postProfile = (req, res, next) => {
    const age = req.body.age;
    const location = req.body.location;
    const gender = req.body.gender;
    const sexualPreference = req.body.sexualPreference;
    const biography = req.body.biography;
    const tags = req.body.tags

    User.findById(req.session.user.id)
        .then(user => {
            user.age = age;
            user.location = location;
            user.gender = gender;
            user.sexualPreference = sexualPreference;
            user.biography = biography;
            user.completedProfile = true;
            user.tags = tags;
            user.save(err => {
                if (err)
                    return res.status(500).json({ msg: 'Internal server error', err });
                return res.status(200).json({ success: true, msg: 'User profile updated' });
            });
        })
        .catch(err => {
            return res.status(500).json({ success: false, msg: 'Internal server error', err });
        });
}

exports.getFilteredUsers = (req, res, next) => {
    const age = {
        low: req.body.age.low,
        high: req.body.age.high
    };
    const fame_rating = {
        low: req.body.fame_rating.low,
        high: req.body.fame_rating.high
    };
    const tags = req.body.tags;
    const sexualPreference = req.body.sexualPreference;

    User.find({
        age: { $lt: age.low, $gt: age.high },
        fameRating: { $lt: fame_rating.low, $gt: fame_rating.high },
        sexualPreference: sexualPreference,
        tags: { $in: tags }
    })

    let profileImage = null;
    UserImages.findOne({ userId: req.user._id })
        .then(images => {
            if (images)
                profileImage = images.profileImage;
            return res.status(200).json({
                success: false,
                msg: 'Successfully retrieved users',
                userObj: {
                    "username": req.user.username,
                    "firstname": req.user.firstname,
                    "lastname": req.user.lastname,
                    "age": req.user.age,
                    "location": req.user.location,
                    "fameRating": req.user.fameRating,
                    "gender": req.user.gender,
                    "biography": req.user.biography,
                    "profileImage": profileImage
                }
            });
        })
        .catch(err => {
            return res.status(500).json({ success: false, msg: 'Internal server error', err });
        });
}

exports.postHistory = (req, res, next) => {
    const refId = req.body.refId;
    console.log(req.session.user);

    History.findOne({ "userId": req.user._id })
        .then(history => {
            if (!history) {
                const newHistory = new History({
                    userId: req.user._id,
                    historyList: [refId]
                });
                newHistory.save(err => {
                    if (err) {
                        return res.status(400).json({ success: false, msg: 'Error adding history', err });
                    }
                    return res.status(200).json({ success: true, msg: 'History added!' });
                });
            }
            history.historyList.push({ $each: [refId] });
            history.save(err => {
                if (err) {
                    return res.status(400).json({ success: false, msg: 'Error adding history', err });
                }
                return res.status(200).json({ success: true, msg: 'History added!' });
            });
        })
        .catch(err => {
            return res.status(400).json({ success: false, msg: 'Internal server error', err });
        });
}

exports.postUserImages = (req, res, next) => {
    if (!req.body && !req.files)
        return res.status(400).json({ success: false, msg: "Error uploading images" });
    UserImages
        .findOne({ "userId": /** req.user._id */ "5e49a3b53d51224d3f729b1c" })
        .then(userImages => {
            if (!userImages) {
                userImages = new UserImages({
                    userId: req.user._id,
                    ImageList: req.files.map((file, index) => { if (index !== 0) return file.filename }),
                    profileImage: req.files[0].filename
                });
            }
            else {
                req.files.foreach((elem, index) => {
                    if (elem.fieldname.charAt(str.length - 1) === 0)
                        userImages.profileImage = elem.filename;
                    else
                        userImages.imageList[elem.fieldname.charAt(str.length - 1)] = elem.filename;
                });
                // userImages.imageList.push({ $each: [req.files.map(file => file.filename)] });
            }
            userImages.save();
            return res.status(200).json({ success: true, msg: 'Image(s) uploaded' });
        })
        .catch(err => {
            return res.status(400).json({ success: false, msg: 'Error uploading image(s)' });
        });
}

exports.getUserImages = (req, res, next) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .then(user => {
            if (!user)
                return res.status(400).json({ success: false, msg: 'A user with this username does not exist' });
            UserImages.findOne({ userId: user._id })
                .then(images => {
                    if (!images)
                        return res.status(400).json({ success: false, msg: 'This user has no images' });
                    return res.status(200).json({
                        success: true, msg: 'Successfully retrieved user images',
                        images: images.imageList,
                        profileImage: profileImage
                    });
                })
                .catch(err => { return res.status(400).json({ success: false, msg: 'Internal server error', err }); });
        })
        .catch(err => { return res.status(400).json({ success: false, msg: 'Internal server error', err }); });
}