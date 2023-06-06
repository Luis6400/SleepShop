![App screenshot]()

## Description

Sleep Tracker is an interactive web application that enables users to track their sleeping patterns, earn points for healthy sleep durations, and use these points to buy products in the built-in Sleep Shop. Built on a secure platform, Sleep Tracker continues monitoring your sleep even when you're logged out. It supports user registration and profile creation for personalized tracking, with a calendar feature for visualizing your sleep patterns over time. It is currently deployed on Heroku, and you can visit the site [here](<Your_Heroku_Link>).

## Table of Contents
- [Description](#description)
- [Installation](#installation)
  - [Database Seeding](#database-seeding)
- [Demo](#demo)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Authors](#authors)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory by running `cd Sleep_Tracker`.
3. Install Node.js on your machine if you haven't already. You can download it from the official website: [https://nodejs.org/](https://nodejs.org/).
4. Install the necessary dependencies by running `npm install` in your terminal. This command will install the required packages listed in the package.json file.
5. Once the installation is complete, you can use the application by running `node server.js` in your terminal. This command will start the application.

## Database Seeding

After installing the dependencies, you need to set up the database configuration:

1. Create a `.env` file in your root directory and add the following variables, replacing `<VALUE>` with your actual data:

    ```env
    DB_NAME=<sleep_shop_db>
    DB_USER=<Your_MySQL_Username>
    DB_PASSWORD=<Your_MySQL_Password>
    ```

2. To seed the database with initial data, navigate to the project directory in your terminal.

3. Run the seed file by typing `node seeds/seeds.js` in your terminal. This command will create the necessary tables and fill them with the seed data.

4. If the seeding process is successful, you should see a confirmation message in your terminal.

## Usage

1. Open your preferred web browser and navigate to the hosted website.
2. Create your user profile to start tracking your sleep.
3. Start tracking by clicking on the 'Start Sleep' button.
4. The application will automatically calculate points based on your sleep duration. Aim for 7-9 hours to be rewarded 50 sleepPOINTS. 
5. Use your earned points to purchase products from the Sleep Shop.

## Dependencies

* bcrypt
* sequelize
* express
* express-handlebars
* mysql
* mysql2
* fullcalendar.io

## Credits

* [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Sequelize](https://sequelize.org/): A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
* [Express](https://expressjs.com/): A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars): A view engine that uses the Handlebars templating library and follows the Express view engine API.
* [MySQL/MySQL2](https://www.npmjs.com/package/mysql2): A node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.
* [bcrypt](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
* [FullCalendar](https://fullcalendar.io/): A full-sized JavaScript event calendar.
* [PicoCSS](https://picocss.com/): A minimal pure CSS framework.

## License

This project is licensed under the terms of the MIT license. For more details, see [the MIT License page](https://opensource.org/licenses/MIT).

## Authors

#### Front End
- [Adam Riet](https://github.com/Adam-Riet)
- [Jahsper Harrell](https://github.com/JahsperH)

#### Back End
- [Luis Villarreal](https://github.com/Luis6400)
- [Dane Kargis](https://github.com/Dkargis)


