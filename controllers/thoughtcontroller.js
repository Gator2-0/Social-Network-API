const {Thought, User, Reaction} = require('../models');

module.exports = {
  //// thought section
  //Create thought
  async createThought(req,res) {
    try {
      const newThought = await Thought.create(req.body);

      const user = await User.findOne(req.body.username);
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
      const thoughts =  await Thought.findById(req.params._id);
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
      console.log('error getting thoughts!')
    }
  },
  //Update thought
  async updateThought(req,res){
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id,req.body,{new:true});
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
      const deletedThought = await Thought.findByIdAndDelete(req.params,id);
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
      const reaction = await Reaction.create(req.body);

      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(reaction._id);
      await thought.save();

      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
      console.log('error creating reaction!')
    }
  },
  //delete Reaction
  async deleteReaction(req,res){
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params,thoughtId,
        { $pull: { reactions: { reactionId: reactionId } }, $unset: { "reactions.$._id": 1 } },
        { new: true }
      );
      const reaction = await Reaction.findOneAndDelete(req.params.reactionId);
      
      res.status(200).json({message: 'Reaction removed succesfully'});
    } catch (err) {
      
    }
  }
}