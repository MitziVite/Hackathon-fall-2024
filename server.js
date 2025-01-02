
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
