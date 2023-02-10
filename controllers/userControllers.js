const { User, Thought } = require('../models');
//const reactionSchema = require('../models/Reaction');


module.exports = {
    getAllUsers(req, res) {
        User.find().then(async (user) => {
            const userObj = {
                user,
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

    deleteUser(req, res) {
        User.findByIdAndRemove(req.params.id )
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
            .then((reactions) =>
                !reactions ? res.status(404).json({
                    message: 'User deleted, no reactions found',
                })
                    : res.json({ message: 'User deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
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
    //add delete friend
  
    addFriend: (req, res) => {
    const following = User.findOneAndUpdate({_id:req.params.id}, 
    {$addToSet:{friends: req.params.friendsId}},
    );
    const follower= User.findOneAndUpdate({_id: req.params.friendsId},
        {$addToSet:{friends: req.params.id}});
    Promise
    .all([following, follower])
    .then(() => res.json({message: 'New friend added'}))
    .catch((err) => res.status(500).json(err));
    },
    deleteFriend(req, res) {
        User.findByIdAndUpdate( req.params.id, {
            $pull:{friends: req.params.friendsId}},
            {new:true}
     )
            .then((user) => !user
                ? res.status(404).json({ message: 'Friend deleted' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
