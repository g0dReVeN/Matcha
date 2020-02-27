const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userImagesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageList: [null, null, null, null, null],
    profileImage: String
});

module.exports = mongoose.model('Images', userImagesSchema);