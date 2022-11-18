'use strict';

const express = requie('express');
const router = express.Router();
const auth = require('basic-auth');
//const bcrypt = require('bcrypt');
//const { check, validationResult } = require('express-validator-check');

//Models
const { User } = require('../models');

//User Routes

//GET Return all properties and values for the currently authenticated User along with a 200 HTTP
//A protected/private route used to retrieve the current user's info
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  res.json({
    firstName: user.name,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password
  });
  res.status(200).end();
}));

//POST Create a new user, set the Location header to "/" and return a 201 HTTP and no content
  //VALIDATION ERRORS SENT WITH A 404 STATUS CODE

router.post('/api/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created!" });
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(404).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;