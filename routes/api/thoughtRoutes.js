const router = require('express').Router();

const{
    addThought,
    deleteThought,
    updateThought,
    thoughtsById,
    getAllThoughts
} = require('../../controllers/thoughtControllers');

router.route('/')
    .get(getAllThoughts);
    
router.route('/:id')
    .post(addThought)
    .delete(deleteThought)
    .put(updateThought)
    .get(thoughtsById)


module.exports = router;