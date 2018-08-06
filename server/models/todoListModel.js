'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    Required: true,
    default: 'name'
  },
  last: {
    type: String,
    default: 'huina'
  },
  img: { 
    type: String, 
    contentType: String,
    default:'https://cdn1.thr.com/sites/default/files/2012/12/img_logo_blue.jpg'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});


module.exports = mongoose.model('Tasks', TaskSchema);