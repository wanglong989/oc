var mongoose = require('mongoose');
var UserSchema = require('../schemas/oc_user');

var user = mongoose.model('User',UserSchema);


module.exports = user;