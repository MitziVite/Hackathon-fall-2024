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

/*  **********************************
 *  Feedback Form Validation Rules
 * ********************************* */
validate.feedbackFormRules = () => {
    return [
        body('helpfulness')
            .notEmpty()
            .withMessage('Please indicate how helpful you found the website.')
            .bail()
            .isInt({ min: 1, max: 5 })
            .withMessage('Please select a rating between 1 and 5.'),

        body('missingClass')
            .notEmpty()
            .withMessage('Please indicate if you were looking for a class that is missing.')
            .bail()
            .isIn(['Yes', 'No'])
            .withMessage('Please select either Yes or No.'),

        body('className')
            .optional()
            .isString()
            .trim()
            .escape()
            .withMessage('Please enter a valid class name or course code.')
            .isLength({ min: 1 })
            .withMessage('Please specify the class or course code you were searching for.'),

        body('missingDetails')
            .optional()
            .isString()
            .trim()
            .escape()
            .withMessage('Please enter valid class details.')
            .isLength({ min: 1 })
            .withMessage('Please provide any additional class details you feel are helpful.'),

        body('extraComments')
            .optional()
            .isString()
            .trim()
            .escape()
            .withMessage('Please enter valid comments.')
            .isLength({ min: 1 })
            .withMessage('Please add any extra comments or suggestions you may have.'),

    ];
};

/* ******************************
 * Check data and return errors or continue to submission
 * ***************************** */
validate.checkFeedbackData = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.session.errors = errors.array().map((err) => err.msg);
        res.redirect("/forms/feedback");
        return;
    }
    next();
};

module.exports = validate;