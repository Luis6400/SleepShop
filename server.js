const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


const sess = {
    secret: 'Super secret secret',
    cookie: {
      // Stored in milliseconds 
      maxAge: 6 * 60 *60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  const hbs = exphbs.create({ helpers });
  
  app.use(session(sess));

  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(routes);
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });