const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    eventType: {type: String},
    eventFrom: {type: String},
    eventEnum: {type: String}, //Success/update/error
    eventData: {type: Object},
    eventTo: {type: String}
},{ timestamps: true });

module.exports = Products = mongoose.model("hooksevents", productSchema);

