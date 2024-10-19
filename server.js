
const expressLayouts = require('express-ejs-layouts');
const express = require("express")
const cors = require("cors");

const env = require("dotenv").config()
const app = express()
const static = require("./routes/routes")
const utilities = require("./utilities");
const baseController = require("./controllers/baseController")
const reviewController = require("./controllers/reviewController")
const bodyParser = require("body-parser");

// const {Pool} = require('pg');
// const inventoryRoute = require('./routes/inventoryRoute')
// const utilities = require('./utilities');


/* ***********************
 * Routes
 *************************/
app.use(cors());
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', '../layouts/layout');
app.use(static)

// Inventory routes
// app.use("/inv", inventoryRoute)

//  route
app.get("/", function (req, res) {
  res.render("index", { title: "Home" })
})
app.use(bodyParser.urlencoded({ extended: true }));
// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));
// utilities.handleErrors(baseController.buildHome)


// app.get('/create-review', (req, res) => {
//     const formHTML = Util.generateForm();
//     res.send(formHTML);
// });
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
