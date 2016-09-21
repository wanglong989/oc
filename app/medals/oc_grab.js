var mongoose = require('mongoose');
var GrabSchema = require('../schemas/oc_grab');

var Grab = mongoose.model('Grab',GrabSchema);


module.exports = Grab;