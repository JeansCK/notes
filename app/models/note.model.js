const mongoose = require("mongoose");
const Item = require("./item.model");

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    title: String,
    description: String,
    items: [
      Item.schema
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    color: String
  },
  {timestamps: true})
);


module.exports = Note;