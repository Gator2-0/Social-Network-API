const User = require('../models');

module.exports = {
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
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Application.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update a user
  async updateUser(req,res){
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);
      res.status(200).json(updatedUser);
      console.log('User updated:', updatedUser)
    } catch (err) {
      res.status(500).json(err);
      console.error('Error updating user');
    }
  }
};
