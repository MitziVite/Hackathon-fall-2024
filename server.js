
// const expressLayouts = require('express-ejs-layouts');
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/routes")
const baseController = require("./controllers/baseController")
// const {Pool} = require('pg');
// const inventoryRoute = require('./routes/inventoryRoute')
// const utilities = require('./utilities');

/* ***********************
 * Routes
 *************************/
app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.set('layout', '../layouts/layout');
app.use(static)

// Inventory routes
// app.use("/inv", inventoryRoute)

// Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})

// Index route
// app.get("/", utilities.handleErrors(baseController.buildHome));
// utilities.handleErrors(baseController.buildHome)



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
