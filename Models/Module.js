const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({

    moduleName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const ModuleModel = mongoose.model('modules', ModuleSchema);

module.exports = ModuleModel;