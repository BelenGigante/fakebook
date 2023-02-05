const router = require('express').Router();

const{
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
} = require('../../controllers/userControllers');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);



module.exports = router;