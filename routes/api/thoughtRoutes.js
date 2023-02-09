const router = require('express').Router();

const{
    addThought,
    deleteThought,
    updateThought,
    thoughtsById,
    getAllThoughts,
    deleteReaction,
    addReaction,
} = require('../../controllers/thoughtControllers');

router.route('/')
    .post(addThought)
    .get(getAllThoughts);
    
router.route('/:id')
    
    .delete(deleteThought)
    .put(updateThought)
    .get(thoughtsById)

router.route('/:id/reactions')
    .post(addReaction)

router.route('/:id/reactions/:reactionsId')
    .delete(deleteReaction)


module.exports = router;