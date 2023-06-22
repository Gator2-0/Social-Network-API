const { Schema, model, Types } = require('mongoose');


// Schema to create Reaction model
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp) // Custom getter function for formatting the timestamp
  }
},{
  toJSON: {
    getters: true,
  },
  id: false,
});


// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp) // Custom getter function for formatting the timestamp
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Custom function to format the timestamp
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

thoughtSchema
  .virtual('reactionCount')
  //Getter
  .get(function (){
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);
module.exports = {Thought};
