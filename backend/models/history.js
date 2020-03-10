const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    historyList: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            like: Boolean
        }
    ]
});

module.exports = mongoose.model('History', historySchema);