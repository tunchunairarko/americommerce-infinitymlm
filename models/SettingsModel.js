const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const settingsSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    amcomApi: {type: String, required: true, unique: true},
    mlmWebHook: {type: String, required: true},
    activeState: {type: String, required: true}
});

module.exports = Settings = mongoose.model("settings", settingsSchema);