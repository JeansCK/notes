module.exports = app => {

    const note = require("../controllers/note.controller.js");
    var router = require("express").Router();
  
    router.post("/user/:userId", note.createDefaultNote);
    router.post("/help/user/:userId", note.createHelpNote);
    router.get("/", note.findNoteById);
    router.get("/user", note.findNoteByUser);
    router.patch("/", note.updateNote);
    router.delete("/", note.deleteNote);
    router.post("/items", note.createItem);
    router.patch("/items", note.updateItem);
    router.delete("/items", note.deleteItem);
    
    app.use("/api/notes", router);
  };