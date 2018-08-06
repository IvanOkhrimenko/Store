'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        Required: true,
        default: 'name'
    },
    last_name: {
        type: String,
        Required: true,
        default: 'last_name'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        Required: true,
    },
    password: {

        type: String,
        Required: true,

    }
});
module.exports = mongoose.model('Users', userSchema);