const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { User, Product, sleep_data, orders } = require('../../models');


router.post('/login', async (req, res) => {
  try {
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
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    var emailcheck = req.body.user_email;
    console.log(emailcheck);
    const usercheck = await User.findOne({ where: { user_email: emailcheck } });
    if (usercheck !== null) {
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
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/dashboard/renderproduct', async (req, res) => {
  try {
    const productData = await Product.findAll();
    const products = productData.map((product) => product.get({ plain: true }));


    res.status(200)
      .json({ products });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }



});

router.post('/dashboard/issleeping', async (req, res) => {
  try {
    const sleepcheck = await sleep_data.findAll({ where: { still_sleeping: true, user_id: req.session.user_id } });
    const sleepdata = await sleep_data.findAll({ where: { user_id: req.session.user_id, still_sleeping: false} });
    const sleepdatearray = [];
    for (var i = 0; i < sleepdata.length; i++) {
      var startyear = parseInt(((sleepdata[i]).date).slice(0,4));
      var startmonth = (parseInt((sleepdata[i].date).slice(5,7)))-1;
      var startday = parseInt((sleepdata[i].date).slice(8,10));
      var starthour = parseInt((sleepdata[i].sleep_start).slice(0,2));
      var startminute = parseInt((sleepdata[i].sleep_start).slice(3,5));
      var startsecond = parseInt((sleepdata[i].sleep_start).slice(6,8));
      
      var endyear = parseInt((sleepdata[i].end_date).slice(0,4));
      var endmonth = (parseInt((sleepdata[i].end_date).slice(5,7)))-1;
      var endday = parseInt((sleepdata[i].end_date).slice(8,10));
      var endhour = parseInt((sleepdata[i].sleep_end).slice(0,2));
      var endminute = parseInt((sleepdata[i].sleep_end).slice(3,5));
      var endsecond = parseInt((sleepdata[i].sleep_end).slice(6,8));
      
      var startdate = new Date(startyear, startmonth, startday, starthour, startminute,startsecond);
      var enddate = new Date(endyear, endmonth, endday, endhour, endminute,endsecond);
      sleepdatearray.push({startdate, enddate});
    }


    if (sleepcheck.length == 0) {
      res.status(201)
      .json({ sleepcheck, sleepdata, sleepdatearray });
    }
    else if (sleepcheck.length !== 0) {
      res.status(200)
      .json({ sleepcheck, sleepdata, sleepdatearray });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/dashboard/createsleep', async (req, res) => {
  try {
    const sleepcheck = await sleep_data.findAll({
      where: {
        still_sleeping: true,
        user_id: req.session.user_id
      }
    });
    if (sleepcheck.length == 0) {
      const sleepData = await sleep_data.create(req.body.sleepstart);
      res.status(201)
        .json({ sleepData });
    }
    else if (sleepcheck.length !== 0) {
      const startyear = parseInt((sleepcheck[0].date).slice(0,4));
      const startmonth = (parseInt((sleepcheck[0].date).slice(5,7)))-1;
      const startday = parseInt((sleepcheck[0].date).slice(8,10));
      const starthour = parseInt((sleepcheck[0].sleep_start).slice(0,2));
      const startminute = parseInt((sleepcheck[0].sleep_start).slice(3,5));
      const startsecond = parseInt((sleepcheck[0].sleep_start).slice(6,8));
      
      const endyear = parseInt((req.body.sleepend.end_date).slice(0,4));
      const endmonth = (parseInt((req.body.sleepend.end_date).slice(5,7)))-1;
      const endday = parseInt((req.body.sleepend.end_date).slice(8,10));
      const endhour = parseInt((req.body.sleepend.sleep_end).slice(0,2));
      const endminute = parseInt((req.body.sleepend.sleep_end).slice(3,5));
      const endsecond = parseInt((req.body.sleepend.sleep_end).slice(5,8));
      
      const startdate = new Date(startyear, startmonth, startday, starthour, startminute,startsecond);
      const enddate = new Date(endyear, endmonth, endday, endhour, endminute,endsecond);
      

      const timeslept = Math.round((((enddate.getTime() - startdate.getTime()) / 1000)/60)/60);

      const points = 0
      if (timeslept >7 && timeslept < 9){
        points = 50;
      }
      const updobj = {time_slept: timeslept, points_earned: points}

      
      

      const sleepData2 = await sleep_data.update(updobj, {
        where: {
          still_sleeping: true,
          user_id: req.session.user_id,
        },
      });
      const sleepData = await sleep_data.update(req.body.sleepend, {
        where: {
          still_sleeping: true,
          user_id: req.session.user_id,
        },
      });
      res.status(202)
        .json({ sleepData,startdate,enddate, points });
    }

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


router.post('/pricecheck', withAuth, async (req, res) => {
try {

  const userData = await User.findByPk(req.session.user_id);
  var user_points = userData.user_points;
  var points = req.body.points;
  if (user_points >= points) {
    res.status(200)
    .json({ user_points });
  }
  else if (user_points < points) {
    res.status(201)
    .json({ user_points });
  }

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

    const orderdata = await orders.create(req.body, {user_id: user_id});


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




module.exports = router;