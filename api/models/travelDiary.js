const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    notes: String
});

module.exports = mongoose.model('Diary', diarySchema);