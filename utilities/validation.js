const { body, validationResult } = require("express-validator")
const validate = {}


/*  **********************************
 *  Search Bar Validation Rules
 * ********************************* */

validate.SearchRules = () =>{
    console.log('you made it to the search rules')
    return [
        body("courseCode")
        .notEmpty()
        .trim()
        .escape()
        .isLength({min:5})
        .withMessage("Check if your course code is correct before searching")

    ]
}

/* ******************************
 * Check data and return errors or continue to details page
 * ***************************** */
validate.checkSearchData = async (req, res, next) => {
    console.log('we are now checking the data')
    const { courseCode } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.render("index", { title: "Search for Courses", errors})
      return
    }
    next()
}


module.exports = validate;