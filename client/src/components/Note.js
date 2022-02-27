import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import NotesService from "../services/notes.service";
import NoteItem from "./NoteItem";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Note(props) {
  const [prevNote, setPrevNote] = useState(props.note)
  const [note, setNote] = useState(props.note);
  const [isNewItem, setIsNewItem] = useState(false);

  const titleRef = useRef(null);

  function onTitleChange(e) {
    setNote({...note, title: e.target.value});
  }

  function onDescriptionChange(e) {
    setNote({...note, description: e.target.value});
  }

  function onTextsBlur() {
    updateNote();
  }

  function updateNote() {
    if (!_.isEqual(prevNote, note)) {
      const data = {
        id: note._id,
        title: note.title,
        description: note.description,
        color: note.color
      }
      NotesService.updateNote(data)
        .then(() => setPrevNote(note))
    }
  }

  useEffect(() => {
    if (props.isNewNote) {
      titleRef.current.scrollIntoView({ behavior: "smooth" });
      titleRef.current.focus();
    }
  }, []);

  function createItem() {
    setIsNewItem(true);
    const data = {
      noteId: note._id,
      item: "",
      checked: false
    };
    NotesService.createItem(note._id, data)
      .then(() => getNote(note._id));
  }

  function deleteItem(id) {
    NotesService.deleteItem(note._id, id)
      .then(() => {
        const currItems = note.items.filter(item => {
          return item._id !== id;
        })
        setNote({...note, items: currItems});
      });
  }

  function getNote(id) {
    NotesService.getNoteById(id)
    .then(res => {
      setNote(res.data);
    });
  }

  function changeColor(e) {
    setNote({...note, color: e.target.name});
  }
  useEffect(() => {
    updateNote();
  },[note.color])

  const paperStyle = {
    width: "300px",
    margin: "20px",
    float: "left",
    backgroundColor: note.color
  }

  const textBoxStyle = {
    mb: 2
  }

  const bottomBoxStyle = {
    textAlign: "right",
    backgroundColor: "#DCDCDC",
    marginTop: "10px"
  }

  const btnColorStyle = {
    margin: "5px 15px",
    height: "10px",
    padding: "10px",
    verticalAlign: "middle",
  }

  return(
    <Paper elevation={3} sx={paperStyle}>
      <Box sx={textBoxStyle}>
        <TextField
          variant="filled"
          hiddenLabel
          size="small"
          fullWidth
          placeholder="Title"
          value={note.title}
          onChange={onTitleChange}
          onBlur={onTextsBlur}
          inputRef={titleRef}
        />
        <TextField
          variant="outlined"
          multiline
          rows={4}
          hiddenLabel
          size="small"
          fullWidth
          placeholder="Description"
          value={note.description}
          onChange={onDescriptionChange}
          onBlur={onTextsBlur}
        />
      </Box>
      <Box>
        {note.items && note.items.map((item) => <NoteItem key={item._id} noteId={note._id} item={item} isNewItem={isNewItem} deleteItem={deleteItem}/>)}
      </Box>
      <Box>
        <IconButton onClick={createItem}>
          <AddCircleOutlineIcon/>
        </IconButton>
        <input type="button" name="#FFFDA2" style={{...btnColorStyle, backgroundColor: "#FFFDA2"}} onClick={changeColor} />
        <input type="button" name="#BAFFB4" style={{...btnColorStyle, backgroundColor: "#BAFFB4"}} onClick={changeColor} />
        <input type="button" name="#FFAB76" style={{...btnColorStyle, backgroundColor: "#FFAB76"}} onClick={changeColor} />
        <input type="button" name="#FF6363" style={{...btnColorStyle, backgroundColor: "#FF6363"}} onClick={changeColor} />
      </Box>
      <Box sx={bottomBoxStyle}>
        <IconButton onClick={() => props.deleteNote(note._id)}>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default Note;