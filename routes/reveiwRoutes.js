const express = require('express')
const utilities = require("../utilities");
const router = express.Router();
const baseController = require('../controllers/baseController');
const reviewController = require('../controllers/reviewController');
const validator = require('../utilities/validation');


// Create a form to send review 
router.get("/rateClassForm", utilities.handleErrors(baseController.buildForm));
router.get("/feedback", utilities.handleErrors(baseController.buildFeedbackForm));
router.post("/submit", 
    validator.reviewFormRules(),
    validator.checkFormData,
    reviewController.createReview);

module.exports = router;