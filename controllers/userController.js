const {User, Thought} = require('../models');

module.exports = {
  //// User section
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
      console.log("Users:"+ users)
    } catch (err) {
      res.status(500).json(err);
      console.log('error getting users!')
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
      console.log('user created:'+ user);
    } catch (err) {
      res.status(500).json(err);
      console.log('Error creating user')
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
       // Find the user by ID
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    // Get the array of thought IDs associated with the user
    const thoughtIds = user.thoughts;

    // Delete all thoughts associated with the user
    if(thoughtIds){
      await Thought.deleteMany({ _id: { $in: thoughtIds } });
    }
    
    // Delete the user
    await User.findByIdAndDelete(user._id);
      
    res.status(200).json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update a user
  async updateUser(req,res){
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body,{ new: true });
      res.status(200).json(updatedUser);
      console.log('User updated:', updatedUser)
    } catch (err) {
      res.status(500).json(err);
      console.error('Error updating user');
    }
  },
  //// Friend section
  // adding friend to user
  async addFriend(req,res){
    try {
      const user = await User.findOne({ _id: req.params.userId });
      user.friends.push(req.params.friendId);
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deleting Friend from user
  async deleteFriend(req,res){
    try {
      const user = await User.findOne({ _id: req.params.userId });
      console.log(user);
      const friend = await User.findOne({_id: req.params.friendId});
      console.log(friend._id);
      const index = user.friends.indexOf(friend._id);
      console.log('index');
      console.log(index);
      if (index !== -1) {
      user.friends.splice(index, 1);
      }else{
        res.status(404).json({ message: 'User has no friends with that Id' })
      }

      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
