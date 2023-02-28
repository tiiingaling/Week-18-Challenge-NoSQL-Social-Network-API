const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import your Thought schema here
const Thought = require('../../models/Thoughts');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single thought by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)
      .populate('reactions')
      .populate('thoughts');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new thought
router.post('/', async (req, res) => {
  const thought = new Thought({
    thoughtText: req.body.thoughtText,
    username: req.body.username,
    userId: req.body.userId
  });
  try {
    const newThought = await thought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { thoughtText, username } = req.body;
  
    try {
      const updatedThought = await Thought.findByIdAndUpdate(id, {
        thoughtText,
        username,
      }, { new: true });
  
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.status(200).json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
