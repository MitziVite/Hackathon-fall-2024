const { query, validationResult } = require("express-validator")
const validate = {}


/*  **********************************
 *  Search Bar Validation Rules
 * ********************************* */

validate.SearchRules = () =>{
    return [
        query("courseCode")
        .notEmpty()
        .withMessage("Type a course code before searching")
        .bail()
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
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((err) => err.msg);
        res.redirect("/");
    //   res.redirect("/", { title: "Search for Courses", errors})
      return
    }
    next()
}


module.exports = validate;