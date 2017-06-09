var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require(path.resolve('models/account'));
var usersData = require(path.resolve('models/usersData'));
var mongoose = require('mongoose');
var flash = require('connect-flash');


router.use(flash());



//user post----------------------

router.post('/', function(req, res) {

    var stickersData = req.body.Data;
    var arrSt = JSON.parse(stickersData);

    var usersdata = [];
    for (var i = 0; i < arrSt.length; i++) {

        arrSt[i].username = arrSt[i].username.replace(/[\r\n]/g, '');
        arrSt[i].username = arrSt[i].username.replace(/(^\s*)|(\s*$)/g, "");

        usersdata.push({
            'tag': arrSt[i].tag,
            'content': arrSt[i].content,
            'top': arrSt[i].top,
            'left': arrSt[i].left,
            'bgcolor': arrSt[i].bgcolor
        });
    }

    usersData.create({
        'username': arrSt[0].username,
        'usersdata': usersdata
    });

    res.render('users');
});


//user get---------------------------



router.get('/', ensureAuthenticated, function(req, res) {
    var loginuser = res.locals.user.username;
    usersData.find({ 'username': loginuser }, function(err, doc) {
        usersData.remove({'username': loginuser }, function (err) {
          if (err) return handleError(err);
        });
        // console.log(doc[0]);
        //res.render('users', { usersdata: doc[0].usersdata });
        if (doc[0] != undefined) {
            res.render('users', doc[0]);
        } else {
            res.redirect('/users/newusers');
        }
    });
});






function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}






//newuser post----------------------

router.post('/users/newusers', function(req, res) {
console.log("1212");
    var stickersData = req.body.Data;
    var arrSt = JSON.parse(stickersData);

    var usersdata = [];
    for (var i = 0; i < arrSt.length; i++) {

        arrSt[i].username = arrSt[i].username.replace(/[\r\n]/g, '');
        arrSt[i].username = arrSt[i].username.replace(/(^\s*)|(\s*$)/g, "");

        usersdata.push({
            'tag': arrSt[i].tag,
            'content': arrSt[i].content,
            'top': arrSt[i].top,
            'left': arrSt[i].left,
            'bgcolor': arrSt[i].bgcolor
        });
    }

    usersData.create({
        'username': arrSt[0].username,
        'usersdata': usersdata
    });

    res.render('newusers');
});


//newuser get---------------------------



router.get('/newusers', ensureAuthenticated, function(req, res) {
    var loginuser = res.locals.user.username;
            res.render('newusers');

    });






// ---------------------------------------------



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
    res.redirect('/');
});



module.exports = router;
