const express = require('express');
const router = express.Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// GET all Thoughts
router.get('/', getThoughts);

// GET single Thought
router.get('/:thoughtId', getSingleThought);

// POST new Thought
router.post('/', createThought);

// PUT update Thought via id
router.put('/:thoughtId', updateThought);

// DELETE Thought
router.delete('/:thoughtId', deleteThought);

// POST new reaction
router.post('/:thoughtId/reactions', addReaction)
// DELETE reaction via id
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction)


module.exports = router;