'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
//const { sequelize, models } = require('./db);
const Sequelize = require('./models/index.js').sequelize;

const routes = require('./routes'); //will help to set up a new router

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Database test connection
//force: true param completely drops a table and re-creates it afterwards each time the app is started. Remove once working in project
(async () => {
  try {
    await Sequelize.sync({ force: true });
    await Sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

// create the Express app
const app = express();
app.use(express.json());

//Add Routes
app.use('/api', routes); //when a request starts with path /api, use the routes inside routes.js 

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
