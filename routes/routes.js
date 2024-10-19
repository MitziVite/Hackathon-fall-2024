const express = require('express');
const baseController = require('../controllers/baseController');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

const jsonMiddleware = express.json();

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

router.get("/", baseController.buildHome);
router.post("/createReview", jsonMiddleware, reviewController.createReview);
router.get("/getCourseReview", jsonMiddleware, reviewController.getReview);


module.exports = router;



