'use strict';

const express = require('express');
const { application } = require('express');
//const { asyncHandler } = require('./middleware/async-handler');
//const courses = require('./courses');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance
const router = express.Router();

/*User Routes

//GET Return all properties and values for the currently authenticated User along with a 200 HTTP
//A protected/private route used to retrieve the current user's info
router.get(/api/users, asyncHandler(async (req, res) => {
    const Users = await routes.getUsers(req.params.id);
  res.json(user); 
  
});
*/

router.get("/users", async (req, res) => {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1] 
    let buff = new Buffer(token, 'base64');
let text = buff.toString('ascii');
console.log(text);
  res.json({
    success: true
  }); 
  
});


/* POST Create a new user, set the Location header to "/" and return a 201 HTTP and no content
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ "message": "Account successfully created!" });
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

*/


//Courses Routes

 /* GET full return all courses including the User associated with each course and a 200 HTTP 
  router.get("/api/courses", asyncHandler(async (req, res) => {
      const courses = await courses.findAll();
      res.render("index", { courses });
    })
  );  
  */

  /* GET Return the corresponding Course including the User associated with that Course and a 200 HTTP 
  router.get("/api/courses/:id", asyncHandler(async (req, res) => {
    res.render("new-courses")})
  );
  */

  /*POST Create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP and no content
  router.post("/api/courses, asyncHandler(async (req, res) => {
    let courses;
     try {
      courses = await Course.create(req.body);
      res.redirect("/");
    } catch(error) {
      if(error.name === "SequelizeValidationError") {
        course = await Course.build(req.body);
        res.render("new-course", { course, errors: error.errors, title: "New Course" })
      } else {
        throw error;
      }
  
    }
     
    }));
    */
  
  /* PUT Update the correspondong Course and return a 204 HTTP and no content 
  router.put("/api/courses/:id", asyncHandler(async (req, res) => {
    const course = await courses.getCourse(req.params.id);
    if(course){
      course.course = req.body.course;
      course.user = req.body.user;
      
     await courses.updateCourse(course); //to data store
     res.status(204).end(); //says we are done
    } else {
      res.status(404).json({message: "Course Not Found"});
    }
  
}));
*/
  
  /* Delete the corresponding course and return a 204 HTTP and no content 
  router.delete("/api/courses/:id", async(async (req, res, next) => {
    try {
        throw new Error("Something terrible happened!");
        const user = await courses.getUser(req.params.id);
        await courses.deleteUser(user;
        res.status(204).end();
      } catch(err){
        next(err);
      }
    }));
*/

module.exports = router;