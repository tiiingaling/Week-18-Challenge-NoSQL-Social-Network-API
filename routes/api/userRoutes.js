const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import your User schema here
const User = require('../../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser); // Return a 201 status code
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update user by id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  try {
    // Find user by id
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    // Return updated user
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
