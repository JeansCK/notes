const db = require("../models");
const Notes = db.note;
const Items = db.item;

exports.createDefaultNote = (req, res) => {
  const note = new Notes({
    title: "",
    description: "",
    items: [],
    user: req.params.userId,
    color: "#FFFDA2"
  });
  note.save(err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully create");
    }
  });
}

exports.createHelpNote = (req, res) => {
  const note = new Notes({
    title: "",
    description: "",
    items: [
      {
        item: "checklist item",
        checked: true
      },
      {
        item: "                  delete item →",
        checked: false
      },
      {
        item: "↙︎new item ⟱change color",
        checked: false
      }
    ],
    user: req.params.userId,
    color: "#FFFDA2"
  });
  note.save(err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully create");
    }
  });
}

exports.updateNote = (req, res) => {
  Notes.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    description: req.body.description,
    color: req.body.color
    },
    function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully update");
      }
    }
  );
}

exports.deleteNote = (req, res) => {
  Notes.findByIdAndDelete(req.query.id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully delete");
    }
  });
}

exports.findNoteByUser = (req, res) => {
  Notes.find({user: req.query.user}, (err, notes) => {
    if (notes) {
      res.send(notes);
    } else {
      res.send(err);
    }
  });
}

exports.findNoteById = (req, res) => {
  Notes.findById(req.query.id, (err, note) => {
    if (note) {
      res.send(note);
    } else {
      res.send(err);
    }
  });
}

exports.createItem = (req, res) => {
  const item = new Items ({
    item: req.body.item,
    checked: req.body.checked
  })
  Notes.findById(req.body.noteId, function(err, note) {
    note.items.push(item);
    note.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully create");
      }
    });
  });
}

exports.updateItem = (req, res) => {
  Notes.findOneAndUpdate(
    {"_id": req.body.noteId, "items._id": req.body.itemId},
    {$set: {"items.$.item": req.body.item, "items.$.checked": req.body.checked}},
    function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully updated");
      }
    }
  );
}

exports.deleteItem = (req, res) => {
  Notes.findOneAndUpdate(
    {"_id": req.query.noteId}, 
    {$pull: {"items": {"_id": req.query.itemId}}}, 
    function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully delete");
    }
  });
}