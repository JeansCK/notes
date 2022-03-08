import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import NotesService from "../services/notes.service";
import Note from "./Note";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const NoteBoard = (props) => {
  const [isNewNote, setIsNewNote] = useState(false)
  const currentUser = AuthService.getCurrentUser();
  const [notes, setNotes] = useState([]);
  const history = useHistory();
  
  useEffect(() => {

    if (!currentUser) {
      logOut();
    } else {
      if (notes.length === 0) {
        getNotes();
      }
    }
  });
  
  async function getNotes() {
    await NotesService.getNotesByUser()
    .then(res => setNotes(res.data));
  }

  function addNote() {
    setIsNewNote(true)
    NotesService.createDefaultNote()
      .then(() => getNotes());
  }

  function addHelpNote() {
    setIsNewNote(true)
    NotesService.createHelpNote()
      .then(() => getNotes());
  }

  function deleteNote(id) {
    NotesService.deleteNote(id)
      .then(() => {
        setNotes(notes => {
          return notes.filter((note) => {
            return note._id !== id;
          });
        });
      });
  }

  function logOut() {
    AuthService.logout();
    history.push("/login");
  }

  const toolbarStyle = {
    "@media (min-width: 0px)": {
      paddingLeft: "0",
      minHeight: "50px"
    }
  }

  const brandingStyle = {
    fontSize: "1rem",
  }

  const iconStyle = {
    ml: 2,
    color: "white",
    fontSize: "xx-large"
  }

  const buttonStyle = {
    ml: 2,
    color: "white",
    textTransform: "none"
  }

  return (
    <Box sx={{mt: 10}}>
      <AppBar sx={{pl: 5}}>
        <Toolbar sx={toolbarStyle}>
          <Typography sx={brandingStyle}>Notes+</Typography>
          <IconButton onClick={addNote}><AddCircleOutlineIcon sx={iconStyle}/></IconButton>
          <IconButton onClick={addHelpNote}><HelpOutlineIcon sx={iconStyle}/></IconButton>
          <Button sx={buttonStyle} onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
      {notes && notes.map((note) => <Note key={note._id} note={note} isNewNote={isNewNote} deleteNote={deleteNote}/>)}
    </Box>
  );
};

export default NoteBoard;