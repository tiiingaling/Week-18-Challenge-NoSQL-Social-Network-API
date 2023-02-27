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
  {
    toJSON: {
        virtuals: true,
    },
    // makes sure there are not two id numbers
    id: false,
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

// Creates the model
const Thoughts = model('Thoughts', thoughtSchema)

// Exports the model to be used
module.exports = Thoughts;