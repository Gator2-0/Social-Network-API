const {Thought, User, Reaction} = require('../models');

module.exports = {
  //// thought section
  //Create thought
  async createThought(req,res) {
    try {
      const newThought = await Thought.create(req.body);

      const user = await User.findOne({username: req.body.username});
      console.log(user);
      user.thoughts.push(newThought._id)
      await user.save();

      res.status(200).json(newThought);
    } catch (err) {
      res.status(500).json(err);
      console.log('Error creating thought')
    }
  },
  //Get all thoughts
  async getThought(req,res){
    try {
      const thoughts =  await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
      console.log('error getting thoughts!')
    }
  },
  //Get one thought
  async getSingleThought(req,res){
    try {
      const thoughts =  await Thought.findById(req.params.thoughtId);
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
      console.log('error getting thoughts!')
    }
  },
  //Update thought
  async updateThought(req,res){
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId,req.body,{new:true});
      res.status(200).json(updatedThought);
      console.log('thought updated')
    } catch (err) {
      res.status(500).json(err);
      console.log('error updating thought!')
    }
  },
  //delete a thought
  async deleteThought(req,res){
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      res.status(200).json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
      console.log('error deleting thought!')
    }
  },
  //// Reaction section
  // 
  async addReaction(req,res){
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      
      console.log(thought);
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log('error creating reaction!')
    }
  },
  //delete Reaction
  async deleteReaction(req,res){
    try {
      console.log(req.params);
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      
      
      res.status(200).json(updatedThought);
      } catch (err) {
        res.status(500).json(err);
        console.log('error deleting reaction!')
    }
  }
}