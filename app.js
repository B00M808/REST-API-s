'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
//const { sequelize, models } = require('./db);
const Sequelize = require('./models/index.js').sequelize;

const indexRouter = require('./routes/index'); 

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Setup request body JSON parsing
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//Add Routes
app.use('/api', indexRouter);


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

/*Database test connection
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
*/
// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;