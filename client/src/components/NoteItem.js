import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import NotesService from "../services/notes.service";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function NoteItem(props) {
    const [prevItem, setPrevItem] = useState(props.item);
    const [item, setItem] = useState(props.item);
    const itemRef = useRef(null);

    useEffect(() => {
        if (props.isNewItem) {
            itemRef.current.focus();
        }
    },[])

    function onCheckedChange(e) {
        setItem({...item, checked: e.target.checked});
    }
    useEffect(() => {
        updateItem();
    },[item.checked])

    function onItemChange(e) {
        setItem({...item, item: e.target.value});
    }
    
    function onItemBlur() {
        updateItem();
    }
    
    function updateItem() {
        if (!_.isEqual(prevItem, item)) {
            const data = {
                noteId: props.noteId,
                itemId: item._id,
                item: item.item,
                checked: item.checked 
            }
            NotesService.updateItem(data)
                .then(() => setPrevItem(item));
        }
    }

    const textStyle = {
        width: "210px"
    }
    
    return ( 
        <div>
            <Checkbox
                id="checked"
                name="checked"
                type="checkbox"
                checked={item.checked}
                onChange={onCheckedChange}
            />
            <TextField
                variant="standard" 
                id="item"
                name="item"
                value={item.item}
                onChange={onItemChange}
                onBlur={onItemBlur}
                inputRef={itemRef}
                sx={textStyle}
            />
            <IconButton
                id="removeItem"
                name="removeIem"
                onClick={() => {props.deleteItem(item._id);}}
            >
                <RemoveCircleOutlineIcon />
            </IconButton>
        </div>
    )
}

export default NoteItem;