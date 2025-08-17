var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var passport = require('./lib/passport')



const config = require('./config/config');           
const memeStore = require('./services/memeStore');



var indexRouter = require('./routes/index');
var memesRouter = require('./routes/memes');
var loginRouter = require('./routes/login');
var memeDetailRouter = require('./routes/meme');

// routes
var app = express();

// One time meme fetch
memeStore.init(config.memeApiUrl);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Core middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap'));
app.use(express.static(__dirname + '/node_modules/jquery'));

// Sessions
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())



// Locals
app.use((req, res, next) => {
	res.locals.isAuthenticated = !!req.user 
	res.locals.user = req.user || null

	if(!req.session.viewedMemeIds) {
		req.session.viewedMemeIds = [];
	}
	next();
})

// Routes
app.use('/', indexRouter);
app.use('/memes', memesRouter);
app.use('/login', loginRouter);









// Catch 404 handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

