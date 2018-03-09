'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  email: { type: String, required: true},
  Token: { type: String, required: true},
  nb_word: {type: Number},
  last_reset: {type: Date}
});

module.exports = mongoose.model('Users', User);
