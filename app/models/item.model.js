const mongoose = require("mongoose");

const Item = mongoose.model("Item", new mongoose.Schema({
        item: String,
        checked: Boolean
}))

module.exports = Item;