import { useState } from 'react';
import noteContext from './noteContext';

const NoteState=(props)=>{
    const host='https://blogplatform-ws0h.onrender.com'
    const notesInitial=[];

    const [notes,setNotes]=useState(notesInitial)
    const [searchTerm,setSearchTerm]=useState('')
    const [filterTag,setFilterTag]=useState('')

    //Get All Notes
    const getNotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method : 'GET',
            headers :{
                "Content-Type" : 'application/json',
                "auth-token" :localStorage.getItem('token')
            }
        });
        const json=await response.json();
        setNotes(json);

    }



    //Add Note
    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnote`,{
            method : 'POST',
            headers :{
                "Content-Type" : 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });

        const note= await response.json();
        setNotes(notes.concat(note))
    }

    //Delete Note
    const deleteNote=async (id)=>{
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method : 'DELETE',
            headers :{
                "Content-Type" : 'application/json',
                "auth-token" :localStorage.getItem('token')
            }
        });
        const json= await response.json();
        console.log(json);
    }

    //Edit Note
    const editNote= async (id,title,description,tag)=>{
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===id){
                notes[index].title=title;
                notes[index].description=description;
                notes[index].tag=tag;
                break;
            }
        }
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
            method : 'PUT',
            headers :{
                "Content-Type" : 'application/json',
                "auth-token" :localStorage.getItem('token')
            },
            body : JSON.stringify({title,description,tag})
        });
        const json= await response.json();
        console.log(json)
    }

    // Filter and search notes
    const getFilteredNotes = () => {
        let filteredNotes = notes;

        // Filter by search term (title and description)
        if (searchTerm) {
            filteredNotes = filteredNotes.filter(note => 
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by tag
        if (filterTag) {
            filteredNotes = filteredNotes.filter(note => 
                note.tag.toLowerCase().includes(filterTag.toLowerCase())
            );
        }

        return filteredNotes;
    }

    // Get unique tags for filter dropdown
    const getUniqueTags = () => {
        const tags = notes.map(note => note.tag).filter(tag => tag && tag !== 'default');
        return [...new Set(tags)];
    }

    return(
        <noteContext.Provider value={{
            notes, 
            addNote, 
            deleteNote, 
            editNote, 
            getNotes, 
            searchTerm, 
            setSearchTerm, 
            filterTag, 
            setFilterTag, 
            getFilteredNotes, 
            getUniqueTags
        }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default  NoteState;