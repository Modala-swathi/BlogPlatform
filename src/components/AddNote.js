import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import './AddNote.css'

const AddNote = (props) => {
    const context=useContext(noteContext);
    const{addNote}=context;

    const[note,setNote]=useState({title : "", description : "", tag : ""})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClick = (e)=>{
        e.preventDefault();
        if(note.title.trim() && note.description.trim() && note.tag.trim()) {
            setIsSubmitting(true);
            addNote(note.title,note.description,note.tag);
            setNote({title : "", description : "", tag : ""});
            props.showAlert("Blog added successfully","success");
            setIsSubmitting(false);
        }
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name] : e.target.value})
    }

    const isFormValid = note.title.trim().length >= 5 && 
                       note.description.trim().length >= 5 && 
                       note.tag.trim().length >= 1;

    return (
        <div className="add-note-container">
            <div className="add-note-header">
                <h2><i className="fa-solid fa-feather"></i> Create New Blog</h2>
                <p className="subtitle">Share your thoughts with the world</p>
            </div>
            
            <form className="add-note-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        <i className="fa-solid fa-heading"></i> Blog Title
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={note.title} 
                        id="title" 
                        name="title" 
                        placeholder="Enter an engaging title..."
                        onChange={onChange} 
                        minLength={5}
                        maxLength={100}
                        required
                    />
                    <span className="char-count">{note.title.length}/100</span>
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">
                        <i className="fa-solid fa-align-left"></i> Description
                    </label>
                    <textarea 
                        className="form-control textarea" 
                        value={note.description} 
                        id="description" 
                        name="description" 
                        placeholder="Write your thoughts here..."
                        onChange={onChange} 
                        minLength={5}
                        rows={5}
                        required
                    />
                    <span className="char-count">{note.description.length} characters</span>
                </div>

                <div className="form-group">
                    <label htmlFor="tag" className="form-label">
                        <i className="fa-solid fa-tag"></i> Category/Tag
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={note.tag} 
                        id="tag" 
                        name="tag" 
                        placeholder="e.g., Technology, Travel, Life..."
                        onChange={onChange} 
                        maxLength={30}
                        required
                    />
                    <span className="char-count">{note.tag.length}/30</span>
                </div>

                <button  
                    disabled={!isFormValid || isSubmitting} 
                    type="submit" 
                    className="btn btn-primary btn-submit" 
                    onClick={handleClick}
                >
                    {isSubmitting ? (
                        <>
                            <i className="fa-solid fa-spinner spinner"></i> Publishing...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-paper-plane"></i> Publish Blog
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddNote
