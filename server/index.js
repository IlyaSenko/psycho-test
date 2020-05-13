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

require('./routes.js')(app);

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
