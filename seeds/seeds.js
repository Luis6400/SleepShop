const sequelize = require('../config/connection');
const { User, Product, sleep_data} = require('../models');

const userData = require('./user_data.json');
const productData = require('./product_data.json');
const sleepData = require('./sleep_data.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

//   for (const sleep of sleepData) {
//     await sleep_data.create({
//       ...sleep,

//     });
//   }

  for (const product of productData) {
    await Product.create({
      ...product,
    });
  }

  process.exit(0);
}

seedDatabase();