const express = require('express');
const router = express.Router();
const baseController = require('../controllers/baseController');
const utilities = require('../utilities');
const validator = require("../utilities/validation")


// Route for Course Details
router.get("/:ccid", 
    validator.SearchRules(),
    validator.checkSearchData,
    utilities.handleErrors(baseController.buildDetails));


module.exports = router;