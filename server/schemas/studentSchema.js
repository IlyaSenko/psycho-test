var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const sectionSchema = new Schema(require('./sectionSchema'));
module.exports = {
  user: {
    name: String,
    birth: Date,
    group: String,
    course: String,
    year: String,
    sex: String,
    date: Date
  },
  sections: {
    1: sectionSchema,
    2: sectionSchema,
    3: sectionSchema,
    4: sectionSchema,
    5: sectionSchema,
    6: sectionSchema,
    7: sectionSchema,
    8: sectionSchema,
    9: sectionSchema
  }
};
