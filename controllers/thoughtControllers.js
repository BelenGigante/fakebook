const { Thought, User} = require('../models');
const reactionSchema = require('../models/Reaction');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find().then(async (thought) => {
            const thoughtObj = {
                thought,
            };
            return res.json(thoughtObj);

        })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    thoughtsById(req, res) {
        Thought.findById(req.params.id)
            .select('-__v').then(async (thought) =>
            !thought
                    ? res.status(404).json({ message: 'Thoughts not found' })
                    : res.json({ thought })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    addThought: ({body}, res) => {
        Thought.create(body)
            .then(thoughtData =>{
                User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: {thoughts: thoughtData._id}},
                    {new: true}
                )
                .then(userData => {
                    if(!userData){
                        res.status(404).json({message: 'Thought created, not user id found'})
                        return;

                    }
                    res.json(userData);
                })
            }) 
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findByIdAndRemove( req.params.id)
        .then((thought) => !thought ? res.status(404).json({ message: 'Thought not found' })
            : User.findOneAndUpdate(
                { thoughts: req.params.id },
                { $pull: { thoughts: req.params.id } },
                { new: true }
            )
        )
            .then((user) => !user
                ? res.status(404).json({ message: 'Thought deleted' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought: (req, res) => {
        Thought.findByIdAndUpdate({ _id: req.params.id },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { reactions: { reactionsId: req.params.reactionsId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

};