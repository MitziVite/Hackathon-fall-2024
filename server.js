const expressLayouts = require('express-ejs-layouts');
const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const app = express();
const routes = require("./routes/routes");
const utilities = require("./utilities");
const bodyParser = require("body-parser");
const session = require("express-session");
const DynamoDBStore = require('connect-dynamodb')(session); // Import DynamoDB store

// Import DynamoDB client from database.js
const { client: dynamoDbClient } = require('./database');  // Import the client from the database.js file
const { connectDB } = require('./database.js')


connectDB()
  .then(result => {
    db = result; // db variable is initialized here

    // Set up express-session with DynamoDB store
    app.use(session({
      store: new DynamoDBStore({
        client: dynamoDbClient,        // DynamoDB client
        table: 'sessions',             // Table where sessions will be stored
        ttl: 14 * 24 * 60 * 60,        // Time to live for sessions in seconds (14 days)
        hashKey: '_ID',          // The primary key for DynamoDB session data
        // Optional rangeKey if you'd like to segment by user or another key (e.g., userId)
      }),
      secret: process.env.SECRET,
      resave: false, 
      saveUninitialized: false,
    }));
    // Express Messages Middleware
    app.use(require('connect-flash')());
    app.use(function(req, res, next){
      res.locals.messages = require('express-messages')(req, res);
      next();
    });

    /* ***********************
     * Routes
     *************************/
    app.use(cors());
    app.set('view engine', 'ejs');
    app.use(expressLayouts);
    app.set('layout', '../layouts/layout');
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(bodyParser.json());
    app.use(routes);

    // Index route
    app.get("/", utilities.handleErrors(routes));
    // File Not Found Route - must be last route in list
    app.use(async (req, res, next) => {
      next({status: 404, message: 'Sorry, we appear to have lost that page.'});
    });

    /* ***********************
    * Express Error Handler
    * Place after all other middleware
    *************************/
    app.use(async (err, req, res, next) => {
      console.error(`Error at: "${req.originalUrl}": ${err.message}`);
      let message;
      let title;
      if(res.status == 404){
        message = err.message;
        title = '404 Course not found';
      } else {
        message = 'Oh no! There was a crash. Maybe try a different route?';
      }
      res.render("errors/error", {
        isHomePage: null,
        title: 'Server Error',
        message,
      });
    });

    /* ***********************
     * Local Server Information
     * Values from .env (environment) file
     *************************/
    const port = 3000;
    const host = "3.225.131.34";

    /* ***********************
     * Log statement to confirm server operation
     *************************/
    app.listen(port, () => {
      console.log(`App listening on http://${host}:${port}`);
    });
  })
  .catch(error => {
    console.error(error);
  });
