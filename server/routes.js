const mongoose = require('mongoose');
const Student = require('./models/Student.js');

module.exports = (app) => {
  app.get('/api/studentsdb', (req, res) => {
    console.log('students are loaded');
    Student.find({}).exec((err, students) => {
      if (err) {
        res.send('error has occured');
      } else {
        res.send(JSON.stringify(students));
      }
    });
  });

  app.post('/api/studentsdb/create', (req, res) => {
    var student = new Student(req.body)
    student.save(function (err, student) {
      if (err) { return next(err) }
      res.json(201, student)
    })
  });

  app.post('/api/studentsdb/delete', (req, res) => {
    Student.findOneAndRemove({_id: req.body._id}, () => {
      console.log('removed: ', req.body);
    });

    res.send(200);
  });
}
