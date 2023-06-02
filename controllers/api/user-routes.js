const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { User, Product, sleep_data, orders } = require('../../models');


router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: { user_email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res
      .status(200)
      .json({ user: userData, message: 'You are now logged in!' });
    });



    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try{
        console.log(req.body);
        var emailcheck =req.body.user_email;
        console.log(emailcheck);
        const usercheck = await User.findOne({ where: { user_email: emailcheck } });
        if(usercheck!==null){
            res.status(400).json({ message: 'Email already in use' });
            return;
        }


        const userData = await User.create(req.body);
            
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                
                res.json({ user: userData, message: 'You are now logged in!' });
            });
        }
        catch(err){
            console.log(err);
            res.status(500).json(err);
        }
});

router.post('/logout', async (req, res) => {
    try{
        if (req.session.logged_in) {
            req.session.destroy(() => {
              res.status(204).end();
            });
          } else {
            res.status(404).end();
          }
    }   
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/dashboard/renderproduct', async (req, res) => {
  try {
      const productData = await Product.findAll();
      const products = productData.map((product) => product.get({ plain: true }));
      

      res.status(200)
      .json({ products});
  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }



});

router.post('/dashboard/createsleep', async (req, res) => {
  try {
      const sleepData = await sleep_data.create(req.body);
      res.status(200)
      .json({ sleepData});
  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/award', withAuth, async (req, res) => {   
  try {
    var points = req.body.points;
    var user_id = req.session.user_id;
    const userData = await User.findByPk(user_id);
    var user_points = userData.user_points;
    var new_points = user_points + points;
    const userUpdate = await User.update({user_points: new_points}, {where: {id: user_id}});
    res.status(200)
    .json({ userUpdate});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/spend', withAuth, async (req, res) => {
  try {
    var points = req.body.points;
    var user_id = req.session.user_id;
    const userData = await User.findByPk(user_id);
    var user_points = userData.user_points;
    var new_points = user_points - points;
    const userUpdate = await User.update({user_points: new_points}, {where: {id: user_id}});
    res.status(200)
    .json({ userUpdate});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/updateemail', withAuth, async (req, res) => {
  try {
    const userdata = await User.findByPk(req.session.user_id);
    userdata.user_email = req.body.user_email;
    await userdata.save();
    res.status(200)
    .json({ userdata});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  } 
});

router.post('/updatepassword', withAuth, async (req, res) => {
  try {
    const userdata = await User.findByPk(req.session.user_id);
    userdata.user_password = req.body.user_password;
    await userdata.save();
    res.status(200)
    .json({ userdata});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/updateusername', withAuth, async (req, res) => {
  try {
    const userdata = await User.findByPk(req.session.user_id);
    userdata.user_name = req.body.user_name;
    await userdata.save();
    res.status(200)
    .json({ userdata});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/updatefirstname', withAuth, async (req, res) => {
  try {
    const userdata = await User.findByPk(req.session.user_id);
    userdata.first_name = req.body.user_first_name;
    await userdata.save();
    res.status(200)
    .json({ userdata});

  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/updatelastname', withAuth, async (req, res) => {
  try {
    const userdata = await User.findByPk(req.session.user_id);
    userdata.last_name = req.body.user_last_name;
    await userdata.save();
    res.status(200)
    .json({ userdata});
  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});



// router.post( )

router.post('')

module.exports = router;