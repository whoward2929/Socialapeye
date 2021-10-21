const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js')

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought_id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema({
  
  thoughtText: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});


//virtual called reaction count that 
//retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;