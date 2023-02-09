const router = require('express').Router();

const{
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControllers');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id/friends/:friendsId')
    .put(addFriend)
    .delete(deleteFriend);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);




module.exports = router;