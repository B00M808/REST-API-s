'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('./models/index.js').sequelize;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//Database test connection
(async () => {
  try {
    await Sequelize.sync();
    await Sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

/* Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', (req, res) => {
  res.json(data);
});
*/
//Send a GET request to /quotes/:id to READ(view) a quote
/* retrieving data
app.get('/quotes/:id', (req, res) => {
  const quote = data.quotes.find(quote => quote.id == req.params.id);
  res.json(quote);
});
*/
//Send a POST request to /quotes to CREATE a new quote
//Send a PUT request to /quotes/:id to UPDATE (edit) a quote
//Send a DELETE request to /quotees/:id DELETE a quote
//Send a GET request to /quotes/quotes/random to READ (view) a random quote

/* Create the User Routes

Send a GET request to /api/users to 
A /api/users GET route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.

Send a GET request to /api/users POST to
A /api/users POST route that will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.
*/

/* Create the Courses Routes
A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
*/


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
