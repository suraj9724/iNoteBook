import { useState } from "react"
import NoteContext from "./notecontext"
// import { json } from "react-router-dom"
const Notestate = (props) => {
    // const s1 = {
    //     "name": "Suraj",
    //     "class": "12A"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "jay",
    //             "class": "11 C"
    //         })
    //     }, 1000)
    // }
    const host = "http://localhost:5000"
    const notesinitial = []
    const [notes, setNotes] = useState(notesinitial);
    // Get all Notes
    const getNotes = async () => {
        // ToDo Api call
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json()
        // console.log(json);
        setNotes(json)
    }
    // Add Note
    const addNote = async (title, description, tag) => {
        // ToDo Api call
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note))

    }
    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = response.json();
        console.log(json)
        console.log("deleting the note " + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }
    // Edit Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = response.json();
        console.log(json)
        // const newNote = notes.filter((note) => { return note._id !== id })
        // setNotes(newNote)
        // eslint-disable-next-line
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default Notestate;
