// TODO: Import packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// TODO: Import ValidationError from sequelize
const { ValidationError } = require('sequelize');

// TODO: Import routes
const routes = require('./routes');

// TODO: Variable to set if environment is in production or not
const { environment } = require('./config');
const isProduction = environment === 'production';

// TODO: Initialize Express app
const app = express();

// TODO: Connect 'morgan' middleware (log request/response)
app.use(morgan('dev'));

// TODO: Add 'cookie-parser' middleware (parse cookies)
// TODO: Add 'express.json' middleware (parse JSON bodies)
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// TODO: Add middlewares
// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// TODO: Add routes to Express application
app.use(routes); // Connect all the routes

// TODO: Resource Not Found Error-Handler
// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");

  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// TODO: Sequelize Error-Handler

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map(e => e.message);
    err.title = 'Validation error';
  }

  next(err);
});

// TODO: Error Formatter Error-Handler
// Error formatter
app.use((err, _req, res, _next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  console.error(err);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors
  });
});

// TODO: PREVENT BACKEND FROM SHOWING
const path = require("path");

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

  });

}

// TODO: Export app
module.exports = app;
