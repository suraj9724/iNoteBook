const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//Route 1: gett all the notes of User using :get: "/api/auth/fetchallnotes", login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})
//Route 2: add notes of User using post: "/api/auth/addnote",login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'provide a proper description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})
//Route 3: Update an Note of User using put: "/api/auth/updatenote",login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a new Note obj;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // find a newnote and update it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})
//Route 4: Delete an Note of User using delete: "/api/auth/deletenote",login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        // Checking the validity of id
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("You are not the owner of this note.") }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})
module.exports = router;