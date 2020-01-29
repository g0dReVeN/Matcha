const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    historyList: [{ type : Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('History', historySchema);