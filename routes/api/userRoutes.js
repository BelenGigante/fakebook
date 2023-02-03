const router = require('express').Router();

const{
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
    addThought,
    deleteThought,
} = require('../../controllers/userControllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:id/thoughts').post(addThought);

router.route('/:id/thoughts/thoughtId').delete(deleteThought);


module.exports = router;