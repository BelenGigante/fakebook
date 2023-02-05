const { Thought } = require('../models');

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
    addThought: (req, res) => {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findByIdAndRemove({ _id: req.params.id })
        .then((thought) => !thought ? res.status(404).json({ message: 'Thought not found' })
            : reactionSchema.findByIdAndUpdate(
                { thought: req.params.id },
                { $pull: { thought: req.params.id } },
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


};