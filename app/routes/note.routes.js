module.exports = app => {
  const { authJwt } = require("../middlewares");
  const note = require("../controllers/note.controller.js");
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notes", [authJwt.verifyToken], note.findNoteByUser);
  app.get("/api/notes/:noteId", [authJwt.verifyToken], note.findNoteById);
  app.post("/api/notes", [authJwt.verifyToken], note.createDefaultNote);
  app.post("/api/notes/help", [authJwt.verifyToken], note.createHelpNote);
  app.patch("/api/notes/", [authJwt.verifyToken], note.updateNote);
  app.delete("/api/notes/:noteId", [authJwt.verifyToken], note.deleteNote);
  app.post("/api/notes/item", [authJwt.verifyToken], note.createItem);
  app.patch("/api/notes/item", [authJwt.verifyToken], note.updateItem);
  app.delete("/api/notes/:noteId/item/:itemId", [authJwt.verifyToken], note.deleteItem);
  
}