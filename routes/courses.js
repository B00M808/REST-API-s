'use strict';

const express = requie('express');
const router = express.Router();
const auth = require('basic-auth');
//const bcrypt = require('bcrypt');
//const { check, validationResult } = require('express-validator-check');

//Models
const { User } = require('../models').Courses;

//Courses Routes

//GET full return all courses including the User associated with each course and a 200 HTTP 
  router.get('/api/courses', asyncHandler(async (req, res) => {
      const courses = await courses.findAll();
      res.render("index", { courses });
    })
  );  


 
module.exports = router;