'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const bcrypt = require('bcryptjs');

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

/*GET Returns all properties and values for the currently authenticated User along with a 200 HTTP
A protected/private route used to retrieve the current user's info */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
const user = req.currentUser;
console.log(user);
  res.status(200).json({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress, 
  });
 
}));

/* POST Creates a new user, set the Location header to "/" and returns a 201 HTTP and no content
Validation Added ensuring the following values are submitted in the request body otherwise, 400 error
Passwords are hashed
 */

router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

//Courses Routes

//GET Returns all courses including the User associated with each course and a 200 HTTP 
  router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: {
        model: User, 
        attributes: ['firstName', 'lastName', 'emailAddress']
        }
      });
      const newCourses = courses.map( ({ id, title, description, estimatedTime, materialsNeeded, userId, User}) => {
      return { id, title, description, estimatedTime, materialsNeeded, userId, User};
      });
    res.send(courses);
    res.status(200).end();
    }));  

 // GET Return the corresponding Course including the User associated with that Course and a 200 HTTP 
  router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      include: {
      model: User, 
      attributes: ['firstName', 'lastName', 'emailAddress']
      }
    })
    if (course) {
      res.status(200).json({
          "id": course.id,
          "title": course.title,
          "description": course.description,
          "estimatedTime": course.estimatedTime,
          "materialsNeeded": course.materialsNeeded,
          "userId": course.userId,
          "User": course.User
      });
  } else {
      res.status(404);
      next();
  }
    res.send(course);
    res.status(200).end();
    }));  
 
/*POST Creates a new course, sets the Location header to the URI for the newly created course, and returns a 201 HTTP and no content
  Validation Added ensuring the following values are submitted in the request body otherwise, 400/401 error
  Authentication Middleware allocated
*/
router.post('/courses', authenticateUser, asyncHandler(async(req,res) => {
  try {
    if (req.currentUser) {
    const course = await Course.create(req.body);
    res.status(201).location('/courses/' + `${course.id}`).end();
    } else {
      res.status(401).json({message: "You don't have access to update this course."});
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

/* PUT Updates the correspondong Course and returns a 204 HTTP and no content 
  Validation Added ensuring the following values are submitted in the request body otherwise, 400 error
  Authentication Middleware allocated
*/
router.put(
  "/courses/:id", authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
      course = await Course.findByPk(req.params.id);
      if (course) {
        if (course.userId === req.currentUser.id) {
          await course.update(req.body);
          res.status(204).end();
        } else {
          res.status(403).json({ message: "user not authenticated" });
        }
      } else {
        res.status(404).json({ message: "Course was not found" });
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);
  
  /*Delete the corresponding course and return a 204 HTTP and no content
  Authentication Middleware allocated */
  router.delete('/courses/:id', authenticateUser, asyncHandler(async(req, res) => {
      try {
        const course = await Course.findByPk(req.params.id)
        if (course) { 
        if (req.currentUser.id === course.userId) {
          await course.destroy();
          res.sendStatus(204);
        } else {
          res.status(403).json({ message: "Access Denied" });
        } 
      } else {
        res.status(404).json({ message: "Course Not Found" });
        }
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(404).json({ errors });   
        } else {
          throw error;
         }
        }
      })   
  );
    
  
 
module.exports = router;