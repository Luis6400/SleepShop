const router = require('express').Router();
const apiRoutes = require('./api');
const shopRoutes = require('./shopRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/shop', shopRoutes);

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;