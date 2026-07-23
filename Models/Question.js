const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "modules",
        required: true
    },

    questionText: {
        type: String,
        required: true
    },

    options: {
        type: [String],
        required: true
    },

    correctAnswer: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const QuestionModel = mongoose.model('questions', QuestionSchema);

module.exports = QuestionModel;