require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ----- for dev and split-them-apart deploy -----

const cors = require("cors");

var corsOptions = {
    origin: process.env.CORES_ORIGIN
  };
app.use(cors(corsOptions));

// ----------

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database", err);
    process.exit();
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/note.routes")(app);

const PORT = process.env.PORT || process.env.DEV_PORT;


// ----- for keep-them-together deploy -----

const path = require("path");

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// ----------

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

function initial() {

  const Role = db.role;
  
  Role.find({}, function(err, roles) {
    if (roles.length === 0){
      Role.insertMany(db.defaultRoles, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default roles to database");
        }
      });
    } else {
      console.log("Successfully read roles from database");
    }
  });

}