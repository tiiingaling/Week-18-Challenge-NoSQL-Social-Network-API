const { Schema, model } = require('mongoose');

// Make the schema
const userSchema = new Schema(
  {
    name: {
      type: STRING,
      required: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: STRING,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
  },
);
// Creates the model
const User = model('User', userSchema)

// Exports the model to be used
module.exports = User;
