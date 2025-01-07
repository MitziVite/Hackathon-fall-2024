
const expressLayouts = require('express-ejs-layouts');
const express = require("express")
const cors = require("cors");
const env = require("dotenv").config()
const app = express()
const routes = require("./routes/routes")
const utilities = require("./utilities");
const bodyParser = require("body-parser");
const session = require("express-session")
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./database.js')
// const { MongoClient } = require('mongodb');
// const uri = process.env.MONGOKEY;
// const client = new MongoClient(uri);

var db = null;

connectDB()
.then(result => {
  db = result; // "Hello, World!"
  // console.log(db)
})
.catch(error => {
  console.error(error);
});

// console.log(db)


// Set up express-session with MongoDB store
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false, 
//     saveUninitialized: false,
//     store: MongoStore.create({
//       client: client, // Use the existing MongoDB client
//       dbName: db.databaseName, // Use the connected database name
//       collectionName: 'sessions', 
//       ttl: 14 * 24 * 60 * 60, // 14 
//     }),
//     cookie: {
//       secure: false, 
//       httpOnly: true, 
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     },
//   })
// );

// Express Messages Middleware
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})




/* ***********************
 * Routes
 *************************/
app.use(cors());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', '../layouts/layout');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())
app.use(routes);


// Index route
app.get("/", utilities.handleErrors(routes));



// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  // let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message
    })
})


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on http://${host}:${port}`)
})
