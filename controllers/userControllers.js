const { Users, Thoughts } = require('../models');

//friend counter idk if its well done, check
const friendCount = async () =>
    Users.aggregate().count('friendCount')
        .then((numberOfFriends) => numberOfFriends);

module.exports = {
    getUsers(req, res) {
        Users.find().then(async (users) => {
            const usersObj = {
                users,
                friendCount: await friendCount(),
            };
            return res.json(usersObj);
        })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getUsersById(req, res) {
        Users.findOne({ _id: req.params.usersId })
            .select('-__v').then(async (users) =>
                !users
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
        Users.create(req.body)
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //update user missing
    deleteUser(req, res) {
        Users.findByIdAndRemove({ __id: req.params.usersId })
            .then((users) => !users ? res.status(404).json({ message: 'User not found' })
                : Thoughts.findByIdAndUpdate(
                    { users: req.params.userId },
                    { $pull: { users: req.params.usersId } },
                    { new: true }
                )
            )
            .then((thoughts) =>
                !thoughts ? res.status(404).json({
                    message: 'User deleted, no thoughts found',
                })
                    : res.json({ meggare: 'User deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    removeThoughts(req, res) {
        Users.findByIdAndUpdate(
            { _id: res.params.usersId },
            { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } },
            { runValidators: true, new: true }
        )
        .then((users) => !users
        ?res.status(404).json({message:'no Thoughts found'})
        :res.json(users)
        )
        .catch((err)=> res.status(500).json(err));
    },

};
