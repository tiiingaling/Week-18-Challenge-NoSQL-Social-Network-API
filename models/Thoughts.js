const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: STRING,
      required: true,
      minlength:1,
      maxlength: 280,
    },
    createdAt: {
      type: DATE,
      default: new Date(),
      // format timestamp
    },
    username: {
        type: STRING,
        required: true,
    },
    reactions: [reactionSchema],
  },
);

// Creates the model
const Thoughts = model('Thoughts', thoughtSchema)

// Exports the model to be used
module.exports = Thoughts;