var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require(path.resolve('models/account'));
var mongoose = require('mongoose');
var flash = require('connect-flash');

router.use(flash());






router.get('/', function(req, res) {
    res.render('users');
});



// Register Page - GET
router.get('/register', function(req, res) {
    res.render('register');
});
// Login Page - GET
router.get('/login', function(req, res) {
    res.render('login');
});


router.post('/register', function(req, res) {
    console.log('1212');
    //----------------vaildation Adding-----------------------------------------------------
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;


    req.checkBody('name', 'name can not be empty.').notEmpty();
    req.checkBody('name', 'You must enter a vaild name.').isAlpha();
    req.checkBody('email', 'email can be be empty').notEmpty();
    req.checkBody('email', 'You must enter a vaild email address').isEmail();
    req.checkBody('username', 'User name can not be empty').notEmpty();
    req.checkBody('password', 'password can not be empty').notEmpty();
    req.checkBody('password', 'Lenth of password must more than 6 character.').len(6, 20);
    req.checkBody('password2', 'Confirm password can not be empty').notEmpty();
    req.checkBody('password2', 'Confirm password must be the same as password you entered').equals(password);


    var errors = req.validationErrors();
    //   console.log(errors);
    console.log('registering user');

    if (errors) {
        console.log('Register vaildation failed');
        // do something with the errors
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            username: username,
            password: password,
            password2: password2
        });
    } else {
        var newUser = {
            name: name,
            email: email,
            username: username,
            password: password
        };
        console.log('Register vaildation passed!');
        Account.register(new Account(newUser), req.body.password, function(err) {
            console.log('user registered!');
            res.redirect('/users/Login');
        });
    }


    //-------------------------------------------------------------------------------------

});


router.post('/login', function(req, res, next) {

    passport.authenticate('local', function(err, account, info) {
        if (err) {
            return next(err);
        }
        if (!account) {
            return res.render('login', req.flash(info.message));
        }
        req.logIn(account, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/users');
        });
    })(req, res, next);
});


router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/users/login');
});



module.exports = router;
