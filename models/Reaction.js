const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionID: {
        type: Schema.Types.ObjectId,
        // creates a new instance of ObjectId
        default: () => new Schema.Types.ObjectId(),
      },
      reactionBody: {
        type: STRING,
        required: true,
        maxlength: 280,
      },
      username: {
          type: STRING,
          required: true,
      },
      createdAt: {
        type: DATE,
        default: new Date(),
      }
    },
  );

  module.exports = reactionSchema;