const express = require('express');
const router = express.Router();
const courses = require('./courses');

app.use(express.json());
app.use('/api', routes);

module.exports = router;