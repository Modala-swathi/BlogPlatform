import { useState } from 'react';
import noteContext from './noteContext';

const NoteState=(props)=>{
    const notesInitial=[
        {
            "_id": "68244d9a94c1c0bd0bcf6d11",
            "user": "6822f137c39dfa67f62faf13",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2025-05-14T08:00:26.571Z",
            "__v": 0
        },
        {
            "_id": "6825901be70b80148888c1493",
            "user": "6822f137c39dfa67f62faf13",
            "title": "My Title 2 ",
            "description": "Please wake up early 2",
            "tag": "personal 2",
            "date": "2025-05-15T06:56:27.018Z",
            "__v": 0
        },
        {
            "_id": "6825901be70b80148888c1492",
            "user": "6822f137c39dfa67f62faf13",
            "title": "My Title 2 ",
            "description": "Please wake up early 2",
            "tag": "personal 2",
            "date": "2025-05-15T06:56:27.018Z",
            "__v": 0
        },
        {
            "_id": "6825901be70b80148888c1491",
            "user": "6822f137c39dfa67f62faf13",
            "title": "My Title 2 ",
            "description": "Please wake up early 2",
            "tag": "personal 2",
            "date": "2025-05-15T06:56:27.018Z",
            "__v": 0
        },
        {
            "_id": "6825901be70b80148888c1490",
            "user": "6822f137c39dfa67f62faf13",
            "title": "My Title 2 ",
            "description": "Please wake up early 2",
            "tag": "personal 2",
            "date": "2025-05-15T06:56:27.018Z",
            "__v": 0
        }
    ]

    const [notes,setNotes]=useState(notesInitial)

    //Add Note
    const addNote=(title,description,tag)=>{
        console.log("Adding a Note")
        const note={
            "_id": "68259401be70b80148888c1490",
            "user": "6822f137c39dfa67f62faf13",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-05-15T06:56:27.018Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    //Delete Note
    const deleteNote=(id)=>{

    }

    //Edit Note
    const editNote=()=>{

    }

    return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default  NoteState;