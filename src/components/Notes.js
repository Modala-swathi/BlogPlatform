import React, { useContext, useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { useNavigate} from 'react-router-dom';
import AddNote from './AddNote';
import SearchBar from './SearchBar';
import noteContext from '../context/notes/noteContext';
import './Notes.css';

const Notes=(props)=> {
    let navigate=useNavigate();
    const context=useContext(noteContext);
    const{notes,getNotes,editNote,getFilteredNotes}=context;
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setLoading(true);
            getNotes();
            setLoading(false);
        }
        else{
            navigate('/login')
        }
    },[getNotes, navigate])

    const [note, setNote] = useState({id : "", etitle : "", edescription : "", etag : ""})

    const updateNote = (currentNote) => {
        setNote({
            id : currentNote._id,
            etitle : currentNote.title, 
            edescription : currentNote.description, 
            etag : currentNote.tag
        });
        setIsModalOpen(true);
    }

    const onChange = (e) => {
        setNote({...note,[e.target.name] : e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeModal();
        props.showAlert("Blog updated successfully","success");
        setIsUpdating(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setNote({id : "", etitle : "", edescription : "", etag : ""});
    }

    const filteredNotes = getFilteredNotes();
    const isFormValid = note.etitle.trim().length >= 5 && 
                       note.edescription.trim().length >= 5 && 
                       note.etag.trim().length >= 1;

    return (
        <div className="notes-container">
            <AddNote showAlert={props.showAlert}/>
            <SearchBar />

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                <i className="fa-solid fa-pen-to-square"></i> Edit Blog
                            </h3>
                            <button 
                                className="modal-close-btn" 
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleClick}>
                                <div className="form-group">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="etitle" 
                                        value={note.etitle} 
                                        name="etitle" 
                                        onChange={onChange} 
                                        minLength={5}
                                        maxLength={100}
                                        required
                                    />
                                    <span className="char-count">{note.etitle.length}/100</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea 
                                        className="form-control textarea" 
                                        id="edescription" 
                                        name="edescription"  
                                        value={note.edescription} 
                                        onChange={onChange} 
                                        minLength={5}
                                        rows={5}
                                        required
                                    />
                                    <span className="char-count">{note.edescription.length} characters</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="etag" className="form-label">Category/Tag</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="etag" 
                                        name="etag" 
                                        value={note.etag} 
                                        onChange={onChange} 
                                        maxLength={30}
                                        required
                                    />
                                    <span className="char-count">{note.etag.length}/30</span>
                                </div>

                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        disabled={!isFormValid || isUpdating} 
                                        type="submit" 
                                        className="btn btn-primary"
                                    >
                                        {isUpdating ? (
                                            <>
                                                <i className="fa-solid fa-spinner spinner"></i> Updating...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-check"></i> Update Blog
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes Section */}
            <div className="notes-section">
                <div className="section-header">
                    <h2><i className="fa-solid fa-book-open"></i> Your Blogs</h2>
                    <span className="blog-count">{filteredNotes.length} blog{filteredNotes.length !== 1 ? 's' : ''}</span>
                </div>

                {loading && (
                    <div className="loading-state">
                        <i className="fa-solid fa-spinner spinner"></i>
                        <p>Loading your blogs...</p>
                    </div>
                )}

                {!loading && filteredNotes.length === 0 && notes.length > 0 && (
                    <div className="empty-state">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <h3>No blogs found</h3>
                        <p>Your search didn't match any blogs. Try adjusting your search criteria.</p>
                    </div>
                )}

                {!loading && notes.length === 0 && (
                    <div className="empty-state">
                        <i className="fa-solid fa-notebook"></i>
                        <h3>No blogs yet</h3>
                        <p>Start sharing your thoughts! Create your first blog post above.</p>
                    </div>
                )}

                {!loading && filteredNotes.length > 0 && (
                    <div className="notes-grid">
                        {filteredNotes.map((note)=>(
                            <NoteItem 
                                key={note._id} 
                                updateNote={updateNote}  
                                showAlert={props.showAlert} 
                                note={note}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notes;
