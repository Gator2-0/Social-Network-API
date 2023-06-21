const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/ // Email validation using regular expression
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
},
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  
  

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
