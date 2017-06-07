var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersData = new Schema({
'usersdata':Object
});


module.exports = mongoose.model('usersData', usersData);