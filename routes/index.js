'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
//const bcrypt = require('bcryptjs');
//const { check, validationResult } = require('express-validator-check');

//Models
const Course = require('../models').Course;
const User = require('../models').User;


// Handler function to wrap each route.
const asyncHandler = (db) => {
  return async (req, res, next) => {
    try {
      await db(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  }
};

//User Routes

//GET Return all properties and values for the currently authenticated User along with a 200 HTTP
//A protected/private route used to retrieve the current user's info
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
console.log(user);
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password
  });
  res.status(200).end();
}));

//POST Create a new user, set the Location header to "/" and return a 201 HTTP and no content
  //VALIDATION ERRORS SENT WITH A 404 STATUS CODE

router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(404).json({ errors });   
    } else {
      throw error;
    }
  }
}));

//Courses Routes

//GET full return all courses including the User associated with each course and a 200 HTTP 
  router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.send(courses);
    res.status(200).end();
    }));  

 // GET Return the corresponding Course including the User associated with that Course and a 200 HTTP 
  router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id)
    res.send(course);
    res.status(200).end();
    }));  
 
  /*POST Create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP and no content
  //VALIDATION ERRORS SENT WITH A 404 STATUS CODE
router.post('/', asyncHandler(authenticateUser),asychHandler(async(req,res) => {
  const course = await Course.create(req.body);
  res.status(201).location(/api/courses/course.id).end();
}))

  router.post("/api/courses, async (req, res) => {
     try {
      if(req.body.user && req.body.course){
        const course = await records.createCourse({
          course: req.body.course,
          user: req.body.author
        });
        res.status(201).json(quote);
      } else {
        res.status(404).json({message: "Course and user required."});
      }
    }
     
    }));
    */

  /* PUT Update the correspondong Course and return a 204 HTTP and no content 
    //VALIDATION ERRORS SENT WITH A 404 STATUS CODE
  router.put('/:id', asyncHandler(authenticateUser), asynchHandler(async(req, res, next) => {
    await course.update(req.body);
    return true;
  }))

  router.put("/api/courses/:id", async(req, res) => {
    const course = await courses.getCourse(req.params.id);
    if(course){
      course.course === req.body.course;
      course.userId === req.body.userId;
      
     await courses.updateCourse(course); //to data store
     res.status(204).end(); //says we are done
    }
});
*/
  
  //Delete the corresponding course and return a 204 HTTP and no content
  router.delete('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id); 
    await course.destroy();
    res.status(204).end();
  }))
/* 
  router.delete("/api/courses/:id", async(req, res) => {
        const course = await courses.deleteCourse(req.params.id);
    if(course){
      course.course === req.body.course;
      course.userId === req.body.userId;
      
     await courses.updateCourse(course); //to data store
     res.status(204).end(); //says we are done
    }
  })); 


  router.delete("/api/courses/:id", async(req, res, next) => {
    try {
        throw new Error("Something terrible happened!");
        const user = await courses.getUser(req.params.id);
        await courses.deleteUser(user;
        res.status(204).end();
      } catch(err){
        next(err);
      }
    }));

    //Middleware
    app.use((req, res, next) => {
      const err = new Error("not Found");
      err.status = 404;
      next(err);
    })

    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        error: {
          message: err.message
        }
      })
    });
*/

 
module.exports = router;