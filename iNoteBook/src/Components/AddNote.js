import React, { useContext, useState } from 'react'
import notecontext from "../context/notes/notecontext"
const AddNote = () => {
    const context = useContext(notecontext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: " ", description: " ", tag: "" })
    const addClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="contiainer my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="row mb-3">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="row-sm-10">
                        <input type="text" className="form-control" name='title' id="title" value={note.title} onChange={onchange} minLength={5} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="row-sm-10">
                        <input type="text" className="form-control" name='description' value={note.description} id="description" onChange={onchange} minLength={5} required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                    <div className="row-sm-10">
                        <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onchange} minLength={5} required />
                    </div>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={addClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
