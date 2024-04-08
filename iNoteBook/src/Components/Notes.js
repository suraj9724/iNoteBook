import React, { useContext, useEffect, useRef, useState } from 'react'
import contextValue from "../context/notes/notecontext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    let history = useNavigate();
    const context = useContext(contextValue);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history('/login');
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT NOTE</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="etitle" className="col-sm-2 col-form-label">Title</label>
                                    <div className="row-sm-10">
                                        <input type="text" className="form-control" name='etitle' id="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="edescription" className="col-sm-2 col-form-label">Description</label>
                                    <div className="row-sm-10">
                                        <input type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" onChange={onChange} minLength={5} required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="etag" className="col-sm-2 col-form-label">Tag</label>
                                    <div className="row-sm-10">
                                        <input type="text" className="form-control" name='etag' value={note.etag} id="etag" onChange={onChange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <input type="email" myref={ref} name="" id="" /> */}
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && "No Notes there"}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
