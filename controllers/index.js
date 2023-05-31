const router = require('express').Router();
const apiRoutes = require('./api/user-routes');
// const shopRoutes = require('./shopRoutes');
const homeRoutes = require('./homeRoutes/home-routes');

// router.use('/shop', shopRoutes);

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;