const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    history: [{
        type: Object,
        required: true
    }]
});

module.exports = mongoose.model("UserHistory", HistorySchema);
