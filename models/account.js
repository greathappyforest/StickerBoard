var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose, {
    incorrectPasswordError: 'incorrectPasswordError',
    incorrectUsernameError: 'incorrectUsernameError'
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
