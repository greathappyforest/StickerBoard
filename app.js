var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');





var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//cookieParser
app.use(cookieParser())
    // Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));



// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
var Account = require('./models/account');
Account.createStrategy();
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Connect mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:123456@ds149431.mlab.com:49431/mynodeprojectdb', function(err) {
    if (err) {
        console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
    }
});


// Connect-Flash Middleware
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});



// Define Routes
app.use('/', index);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(3000);
console.log('Server started on port 3000');
