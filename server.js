
const expressLayouts = require('express-ejs-layouts');
const express = require("express")
const cors = require("cors");
const env = require("dotenv").config()
const app = express()
const routes = require("./routes/routes")
const utilities = require("./utilities");
const bodyParser = require("body-parser");


/* ***********************
 * Routes
 *************************/
app.use(cors());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', '../layouts/layout');
app.use(routes)
app.use(bodyParser.urlencoded({ extended: true }));


// Index route
app.get("/", utilities.handleErrors(routes));


app.post("/submit", (req, res) => {
    // Get the form data
    const { grades, difficulty, hoursPerWeek, finalProject, finalTest, overallSatisfaction, onlinevsperson, term, teacher } = req.body;
    
    // Here you can process the data, save it to a database, etc.
    console.log("Form submitted:", req.body);

    // Redirect to a success page or send a response
    res.send("Form received successfully.");
});

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
