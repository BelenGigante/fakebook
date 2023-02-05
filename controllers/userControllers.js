const { User, Thought } = require('../models');

//friend counter idk if its well done, check
// const friendCount = async () =>
//     User.aggregate().count('friendCount')
//         .then((numberOfFriends) => numberOfFriends);

module.exports = {
    getAllUsers(req, res) {
        User.find().then(async (user) => {
            const userObj = {
                user,
                // friendCount: await friendCount(),
            };
            return res.json(userObj);
            
        })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getUserById(req, res) {
        User.findById(req.params.id)
            .select('-__v').then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'User not found' })
                    : res.json({
                        user,
                        
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //update user missing
    deleteUser(req, res) {
        User.findByIdAndRemove({ __id: req.params.id })
            .then((user) => !user ? res.status(404).json({ message: 'User not found' })
                : Thought.findByIdAndUpdate(
                    { user: req.params.id },
                    { $pull: { user: req.params.id } },
                    { new: true }
                )
            )
            .then((thoughts) =>
                !thoughts ? res.status(404).json({
                    message: 'User deleted, no thoughts found',
                })
                    : res.json({ message: 'User deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // deleteThought(req, res) {
    //     User.findByIdAndUpdate(
    //         { _id: res.params.id },
    //         { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
    //         { runValidators: true, new: true }
    //     )
    //         .then((user) => !user
    //             ? res.status(404).json({ message: 'no Thought found' })
    //             : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },

    // addThought: (req, res) => {
    //     Thought.create(req.body)
    //         .then((thought) => res.json(thought))
    //         .catch((err) => res.status(500).json(err));
    // },
    updateUser: (req, res) => {
        User.findByIdAndUpdate({ _id: req.params.id },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
};
