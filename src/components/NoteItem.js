import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import './NoteItem.css';

const NoteItem=(props)=> {
    const context=useContext(noteContext);
    const {note,updateNote}=props
    const{deleteNote}=context;
    const [isDeleting, setIsDeleting] = useState(false);

    // Format the date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this note?')) {
            setIsDeleting(true);
            deleteNote(note._id);
            props.showAlert("Deleted successfully","success")
        }
    }

    return (
        <div className="note-item">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="note-actions">
                        <button 
                            className="action-btn edit-btn" 
                            onClick={()=>{updateNote(note)}}
                            title="Edit note"
                            aria-label="Edit note"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                            className="action-btn delete-btn" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            title="Delete note"
                            aria-label="Delete note"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer">
                    <span className="badge">{note.tag}</span>
                    <small className="timestamp">
                        <i className="fa-solid fa-clock"></i>
                        {formatDate(note.date)}
                    </small>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
