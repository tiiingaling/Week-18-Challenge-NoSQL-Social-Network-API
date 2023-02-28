const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionID: {
        type: Schema.Types.ObjectId,
        // creates a new instance of ObjectId
        default: () => new Schema.Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
          type: String,
          required: true,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      }
    },
  );

  module.exports = reactionSchema;