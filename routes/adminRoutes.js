const express = require('express')
const utilities = require("../utilities");
const router = express.Router();
const baseController = require('../controllers/baseController');
const validator = require('../utilities/validation');


// Create a form to send review 
router.get("/", utilities.handleErrors(baseController.buildLogin));

router.post("/login", 
    validator.feedbackFormRules(),
    validator.checkFeedbackData,
    reviewController.uploadFeedback);
router.post("/submit", 
    validator.reviewFormRules(),
    validator.checkFormData,
    reviewController.createReview);

module.exports = router;