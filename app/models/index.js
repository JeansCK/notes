require("dotenv").config();

const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.url=process.env.DB_URL;

db.user = require("./user.model");

db.role = require("./role.model");
db.defaultRoles = [
  {name: "user"}, 
  {name: "admin"}, 
  {name: "moderator"}
];

db.note = require("./note.model");
db.item = require("./item.model")

module.exports = db;