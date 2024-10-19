const Review = require('../models/reviewModel.js');

const createReview = async function (req, res, next) {
    review = new Review(req.body);
    review.createReview();
    res.status(200).json();
    return ''; // Return the created review
};

const getReview = async function (req, res, next) {
    review = new Review();
    const codeClass = req.query.courseID;
    ans = await review.getAverages(codeClass);
    res.json(ans);
};

module.exports = { createReview, getReview };
