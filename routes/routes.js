const express = require('express');
const aboutRoutes = require('./aboutRoutes')
const reviewRoutes = require('./reveiwRoutes')
const utilities = require("../utilities");
const baseController = require('../controllers/baseController');
const reviewController = require('../controllers/reviewController');
const router = express.Router();



// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Frontend Routes
router.get("/", utilities.handleErrors(baseController.buildHome));
router.get("/search", utilities.handleErrors(baseController.searchResults))
router.use("/about", utilities.handleErrors(aboutRoutes));
router.use("/forms", utilities.handleErrors(reviewRoutes));
router.get("/admin", utilities.handleErrors(baseController.buildLogin))

// Backend Routes
router.post("/createReview", reviewController.createReview);
router.get("/getCourseReview", reviewController.getReview);
router.get("/getCourseDetails", reviewController.getCourseDetails);


module.exports = router;



