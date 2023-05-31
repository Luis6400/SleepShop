const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        
        res.render('shop', {
            logged_in: req.session.logged_in,
        });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login', {logged_in: req.session.logged_in});

});

router.get('/product', withAuth , async (req, res) => {
    try {
        res.render('product', {
        logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;