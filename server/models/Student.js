const mongoose = require('mongoose');
const studentSchema = require('../schemas/studentSchema');

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;
