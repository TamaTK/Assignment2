const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://new:new@assignment1.onadgeh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Event handler for successful database connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event handler for database connection error
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Import required modules and packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');

// Import routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var groupRoute = require('./routes/group');
var app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: 'asdf', // Change this to a secret key of your choice
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

// Define route handlers
app.use('/group', groupRoute);
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Error handling for 404 Not Found
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handling middleware
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
