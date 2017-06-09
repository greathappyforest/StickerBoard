var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersData = new Schema({
    'username':String,
    'usersdata':[{
    'tag':[String],
    'content':[String],   
    'top':Number,   
    'left':Number,   
    'bgcolor':String,  
    }]
});



module.exports = mongoose.model('usersData', usersData);
