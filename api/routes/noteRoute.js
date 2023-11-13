const router = require("express").Router();
const verify = require("../verifyToken");
const Notes = require("../models/notes");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const notes = await Notes.find().sort({ createdAt: -1 }).limit(50);
      res.status(201).json(notes);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(403).json("unauthorised...");
  }
});

// get-user-id-notes
router.get("/user/:user_id", verify, async (req, res) => {
  if (req.params.user_id === req.user._id || req.user.isAdmin) {
    try {
      const notes = await Notes.find({ admin_id: req.params.user_id }).limit(
        20
      );
      res.status(201).json(notes);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(403).json("unauthorised...");
  }
});

// save-note
router.post("/register", async (req, res) => {
  const newNote = new Notes({
    ...req.body,
  });

  try {
    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    res.status(201).json(note);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.put("/markimp/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    note.important = !note.important;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: {important: note.important},
      },
      { new: true }
    );

    res.status(201).json(updatedNote);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.put("/markdone/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);

    note.done = !note.done;
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        $set: {done: note.done},
      },
      { new: true }
    );


    res.status(201).json(updatedNote);
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
