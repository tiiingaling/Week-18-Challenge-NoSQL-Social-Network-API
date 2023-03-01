const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        // creates a new instance of ObjectId
        default: () => new Types.ObjectId(),
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