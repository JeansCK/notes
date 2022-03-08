const db = require("../models");
const Notes = db.note;
const Items = db.item;

exports.createDefaultNote = (req, res) => {
  const note = new Notes({
    title: "",
    description: "",
    items: [],
    user: req.userId,
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
    user: req.userId,
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
  Notes.findOneAndUpdate({user: req.userId, _id: req.body.id}, {
    title: req.body.title,
    description: req.body.description,
    color: req.body.color
    },
    function(err, note) {
      if (err) {
        res.send(err);
      } else if (!note) {
        res.send("Note not found");
      } else {
        res.send("Successfully update");
      }
    }
  );
}

exports.deleteNote = (req, res) => {
  Notes.findOneAndDelete({user: req.userId, _id: req.params.noteId}, (err, note) => {
    if (err) {
      res.send(err);
    } else if (!note) {
      res.send("Note not found");
    } else {
      res.send("Successfully delete");
    }
  });
}

exports.findNoteByUser = (req, res) => {
  Notes.find({user: req.userId}, (err, notes) => {
    if (notes) {
      res.send(notes);
    } else {
      res.send(err);
    }
  });
}

exports.findNoteById = (req, res) => {
  Notes.findOne({user: req.userId, _id: req.params.noteId}, (err, note) => {
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
  
  Notes.findOne({user: req.userId, _id: req.body.noteId}, function(err, note) {
    if (err) {
      res.send(err);
    } else if (!note) {
      res.send("Note not found")
    } else {
      note.items.push(item);
      note.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.send("Successfully create");
        }
      });
    }
  });
}

exports.updateItem = (req, res) => {
  Notes.findOneAndUpdate(
    {user: req.userId, "_id": req.body.noteId, "items._id": req.body.itemId},
    {$set: {"items.$.item": req.body.item, "items.$.checked": req.body.checked}},
    function(err, item) {
      if (err) {
        res.send(err);
      } else if (!item) {
        res.send("Item not found");
      } else {
        res.send("Successfully updated");
      }
    }
  );
}

exports.deleteItem = (req, res) => {
  Notes.findOneAndUpdate(
    {user: req.userId, "_id": req.params.noteId}, 
    {$pull: {"items": {"_id": req.params.itemId}}},
    function(err, note) {
      if (err) {
        res.send(err);
      } else if (!note) {
        res.send("Note not found");
      } else {
        res.send("Successfully delete");
    }
  });
}