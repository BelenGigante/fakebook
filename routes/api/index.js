const router = require('express').Router();
const userRoutes = require('./userRoutes');
const toughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', toughtRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;