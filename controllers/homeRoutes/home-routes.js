const router = require('express').Router();
const { json } = require('sequelize');
const sequelize = require('../../config/connection');
const { Product } = require('../../models');
const { User } = require('../../models');
const { sleep_data } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const sleepData = await sleep_data.findByPk(req.session.user_id);
        if (sleepData) {
            const sleep = sleepData.map((sleep) => sleep.get({ plain: true }));

            res.render('dashboard', { logged_in: req.session.logged_in, sleep, user_id: req.session.user_id, layout: 'dashboardframe' });
        }else{
            res.render('dashboard', { logged_in: req.session.logged_in, user_id: req.session.user_id, layout: 'dashboardframe' });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/shop', withAuth, async (req, res) => {
    try {
        const productData = await Product.findAll();
        const products = productData.map((product) => product.get({ plain: true }));
        const half = Math.ceil(products.length / 2);
        const products1 = products.slice(half, products.length);
        const products2 = products.slice(0, half);
        
        res.render('shop', {
            logged_in: req.session.logged_in,
            products1,
            products2,
            layout: 'shopframe',
        });
    
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    
    if (req.session.logged_in) {
        res.redirect('/shop');
        return;
    }
    res.render('login', {logged_in: req.session.logged_in, layout: 'loginframe'} );

});

router.get('/product/:id', withAuth , async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id);
        const product = productData.get({ plain: true });

        res.render('product', {
        logged_in: req.session.logged_in,
        product,
        layout: 'shopframe',

        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/shop');
            return;
        }
        res.render('signup', {logged_in: req.session.logged_in, layout: "signupframe"},);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/account', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
        const user = userData.get({ plain: true });
        res.render('profile', {logged_in: req.session.logged_in,user , layout: 'profileframe'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/cart/:id/:quantity', withAuth, async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id);
        const product = productData.get({ plain: true });
        const quantity = req.params.quantity;

        res.render('checkout', { logged_in: req.session.logged_in, product, quantity, layout: 'shopframe' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});







module.exports = router;