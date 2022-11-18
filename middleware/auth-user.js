'use strict';
const express = require('express');
const auth = require('basic-auth');
//const bcrypt = require('bcryptjs');
const { User } = require('../models').Users;


/**
 * Middleware to authenticate the request using Basic Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {Function} next - The function to call to pass execution to the next middleware.
 */

 exports.authenticateUser = async (req, res, next) => {
    let message;
  
    const credentials = auth(req);
    const users = await Users.findAll();
    const user = users.find(user.emailAddress === credentials.name);
  
    if (credentials) {
      const user = await User.findOne({ where: {username: credentials.name} });
      if (user) {
        //Validate User's password to the Authorization Header
        const authenticated = bcrypt
          .compareSync(credentials.pass, user.confirmedPassword);
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.username}`);
  
          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Authentication failure for username: ${user.username}`;
        }
      } else {
        message = `User not found for username: ${credentials.name}`;
      }
    } else {
      message = 'Auth header not found';
    }
  
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  };

  module.exorts = {
    authenticateUser
  };