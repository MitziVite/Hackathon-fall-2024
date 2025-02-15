const { query, body, validationResult } = require("express-validator")
const validate = {}


/*  **********************************
 *  Search Bar Validation Rules
 * ********************************* */

validate.SearchRules = () => {
    return [
        query("courseCode")
            .notEmpty()
            .withMessage("Type a course code before searching.")
            .bail()
            .isString()
            .withMessage("Course code must be a valid string.")
            .trim()
            .escape()
            .isLength({ min: 5 })
            .withMessage("Check if your course code is correct before searching."),
    ];
};

/* ******************************
 * Check data and return errors or continue to details page
 * ***************************** */
validate.checkSearchData = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((err) => err.msg);
        res.redirect("/");
        return;
    }
    next();
};

/*  **********************************
 *  Review Form Validation Rules
 * ********************************* */
validate.reviewFormRules = () => {
    return [
        body('codeClass')
            .notEmpty()
            .withMessage('Please include a course code.')
            .bail()
            .trim()
            .escape()
            .isLength({ min: 5 })
            .withMessage("Course code must be at least 5 characters."),

        body('semester')
            .notEmpty()
            .withMessage('Please indicate the semester you took the class.'),

        body('year')
            .notEmpty()
            .withMessage('Please indicate the year you took the class.')
            .bail()
            .isLength({ min: 4, max: 4 })
            .withMessage('Please enter a valid 4-digit year.')
            .bail()
            .isInt({ min: 2015, max: 2025 })
            .withMessage('You can only review a course within the last decade.')
            .escape(),

        body('grades')
            .notEmpty()
            .withMessage('Please select a valid grade letter.'),

        body('difficulty')
            .notEmpty()
            .withMessage('Please indicate level of difficulty.'),

        body('hoursPerWeek')
            .notEmpty()
            .withMessage('Please indicate approx. hours per week spent for the class.'),

        body('overallSatisfaction')
            .notEmpty()
            .withMessage('Please indicate your overall satisfaction.'),

        body('classType')
            .notEmpty()
            .withMessage('Please indicate your class type.'),

        body('teacher')
            .notEmpty()
            .withMessage("Please type a teacher's name.")
            .isString()
            .trim()
            .escape()
            .withMessage("Teacher's name must be a valid string."),

        body('comments')
            .notEmpty()
            .withMessage("Add your review comments for the class.")
            .isString()
            .trim()
            .escape()
            .withMessage("Comments must be a valid string."),
    ];
};

/* ******************************
 * Check data and return errors or continue to details page
 * ***************************** */
validate.checkFormData = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((err) => err.msg);
        res.redirect("/forms/rateClassForm");
        return;
    }
    next();
};

module.exports = validate;