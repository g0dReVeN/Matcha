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
    .catch(err => res.status(500).json({ success: false, msg: 'Internal server error', err }));
}

exports.getFilteredUsers = (req, res, next) => {

  /** Things to do:
   * Gotta include pics into result eventually
   * And include location into query and response
   */

  const age = {
    low: req.body.age.low,
    high: req.body.age.high
  };
  const fame_rating = {
    low: req.body.fame_rating.low,
    high: req.body.fame_rating.high
  };
  const tags = req.body.tags;

  History.findOne({ userId: req.user._id })
    .then(history => {
      let historyList;
      if (!history)
        historyList = [];
      else
        historyList = history.historyList.map(userHistory => userHistory.user);
      User.find({
        age: { $lt: age.high, $gt: age.low },
        fameRating: { $lt: fame_rating.high, $gt: fame_rating.low },
        sexualPreference: req.user.sexualPreference,
        tags: { $in: tags },
        _id: { $not: { $in: historyList } }
      })
        .select(["-password", "-email"])
        .limit(6)
        .then(users => {
          return res.status(200).json({ success: true, msg: 'Found users mathcing filters', users });
        })
        .catch(err => res.status(500).json({ success: false, msg: 'Internal server error', err }));
    })
    .catch(err => res.status(500).json({ success: false, msg: 'Internal server error', err }));
}

exports.postHistory = (req, res, next) => {
  const historyEntry = {
    user: req.body.refId,
    like: req.body.like
  };

  History.findOne({ "userId": req.user._id })
    .then(history => {
      if (!history) {
        const newHistory = new History({
          userId: req.user._id,
          historyList: [historyEntry]
        });
        newHistory.save()
          .then(result => {
            if (!result)
              return res.status(500).json({ success: false, msg: 'Internal server error', err });
            return res.status(200).json({ success: true, msg: 'History added!' });
          })
          .catch(err => {
            return res.status(500).json({ success: false, msg: 'Internal server error', err });
          });
      } else {
        history.historyList.push(historyEntry);
        console.log(history);
        history.save(err => {
          if (err) {
            return res.status(400).json({ success: false, msg: 'Error adding history', err });
          }
          return res.status(200).json({ success: true, msg: 'History added!' });
        });
      }
    })
    .catch(err => res.status(500).json({ success: false, msg: 'Internal server error', err }));
}

exports.postUserImages = (req, res, next) => {
  // if (!req.body && !req.files)
  if (!req.files)
    return res.status(401).json({ success: false, msg: "Error uploading images" });
  UserImages
    .findOne({ "userId": "5e58344e07a09f3d72085a5e" })
    .then(userImages => {
      if (!userImages) {
        let imageList = req.files.filter((file, index) => {
          if (index === 0)
            return false;
          return true;
        }).map(file => file.filename );
        userImages = new UserImages({
          userId: "5e58344e07a09f3d72085a5e",
          imageList: imageList,
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
      }
      userImages.save(err => {
        if (err)
          return res.status(500).json({ success: false, msg: 'Error uploading image(s)', err });
        return res.status(200).json({ success: true, msg: 'Image(s) uploaded' });
      });
    })
    .catch(err => res.status(500).json({ success: false, msg: 'Internal server error', err }));
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