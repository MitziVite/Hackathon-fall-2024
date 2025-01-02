const express = require('express')
const utilities = require("../utilities");
const router = express.Router();
const baseController = require('../controllers/baseController');

// Create a form to send review 
router.get("/rateClassForm", utilities.handleErrors(baseController.buildForm));


module.exports = router;