const { Schema, model } = require('mongoose');

// Make the schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
  },
  {
    toJSON: {
        virtuals: true,
    },
    // makes sure there are not two id numbers
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Creates the model
const User = model('User', userSchema)

// Exports the model to be used
module.exports = User;
