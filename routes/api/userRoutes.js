const express = require('express');
const router = express.Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
} = require('../../controllers/userController');

// GET all users
router.get('/', getUsers);

// GET single user
router.get('/:userId', getSingleUser);

// POST new user
router.post('/', createUser);

// PUT update user
router.put('/:userId', updateUser);

// DELETE user
router.delete('/:userId', deleteUser);

// POST friend to user
router.post('/:userId/friends/:friendId', addFriend);

module.exports = router;
