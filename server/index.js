const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors')
const Student = require('./models/Student.js');

const app = express();
app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(pino);

mongoose.connect('mongodb://admin:12345qwert@ds161336.mlab.com:61336/psycho-test',
    {useNewUrlParser: true },function(err) {
        if(err) {
            console.log('Some problem with the connection ' +err);
        } else {
            console.log('The Mongoose connection is ready');
        }
    })

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello $world!` }));
});

// app.get('*', (req,res) => {
//   res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
// })

app.get('/studentsdb', (req, res) => {
  console.log('students are loaded');
  Student.find({}).exec((err, students) => {
    if (err) {
      res.send('error has occured');
    } else {
      res.send(JSON.stringify(students));
    }
  });
});

app.post('/studentsdb/create', (req, res) => {
  // console.log(JSON.parse(Object.keys(req.body)[0])._id)
  // let card = JSON.parse(Object.keys(req.body)[0])
  // let _id = card._id;
  // // delete card._id;
  // Card.findOneAndUpdate({heading: card.heading}, card, () => {
  //   console.log('updated');
  // })
  var student = new Student(req.body)
  student.save(function (err, student) {
    if (err) { return next(err) }
    res.json(201, student)
  })
  // console.log(req.body)
  // Student.create(req.body).then(async student => {
  //   await res.json(student);
  //   console.log(student)
  // })
  //
  //
  // res.send(200);
});
//
// app.post('/cardsdb/edit', (req, res) => {
//   // console.log(JSON.parse(Object.keys(req.body)[0])._id)
//   // let card = JSON.parse(Object.keys(req.body)[0])
//   // let _id = card._id;
//   // // delete card._id;
//   Card.findOneAndUpdate({_id: req.body._id}, req.body, () => {
//     console.log('updated');
//   })
//   console.log(req.body)
//   console.log('editede')
//
//   res.send(200);
// });
//
// app.post('/cardsdb/delete', (req, res) => {
//   Card.findOneAndRemove({_id: req.body._id}, () => {
//     console.log('removed: ', req.body);
//   });
//
//   res.send(200);
// });

app.post('/studentsdb/delete', (req, res) => {
  Student.findOneAndRemove({_id: req.body._id}, () => {
    console.log('removed: ', req.body);
  });

  res.send(200);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
