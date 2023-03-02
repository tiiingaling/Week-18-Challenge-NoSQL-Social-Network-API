const User = require('../models/User');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : user.thoughts.length > 0
          ? user.thoughts.map((thought) => thought.remove())
          : Promise.resolve()
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


// Add a friend to user via userId
addFriend(req, res) {
  const friendId = req.params.friendId;

  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: friendId } },
    { new: true }
  )
    .populate('friends', 'username')
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json({ message: `Added friend ${friendId} to user ${user.username}`, user });
    })
    .catch((err) => {
      console.log('error:',err);
      res.status(500).json(err);
    });
},

deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true },
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},


};