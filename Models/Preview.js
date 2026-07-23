const mongoose = require('mongoose');

const PreviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "questions"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});


const PreviewModel = mongoose.model('previews', PreviewSchema);

module.exports = PreviewModel;