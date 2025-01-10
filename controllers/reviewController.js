const Review = require('../models/reviewModel.js');


const createReview = async function (req, res, next) {
    let post = req.body
    let form = {
        codeClass: post.codeClass,
        semester: post.semester, 
        year: post.year,
        grades: post.grades,
        difficulty: post.difficulty,
        hoursPerWeek: post.hoursPerWeek,
        evaluationType: post.evaluationType,
        overallSatisfaction: post.overallSatisfaction,
        onlinevsperson: post.classType,
        teacher: post.teacher,
        comment: post.comment,
        db: post.db
    }
    let review = new Review(form);
    review.createReview();
    req.flash('message', 'Your feedback was saved successfully')
    res.redirect("/");
};

const getReview = async function (req, res, next) {
    let review = new Review();
    const codeClass = req.query.courseID.toUpperCase();
    let ans = await review.getAverages(codeClass);
    res.json(ans);
};

const getCourseDetails = async function (req, res, next) {
    let review = new Review();
    const codeClass = req.query.courseID.toUpperCase();
    let ans = await review.getClassesWithReviews(codeClass);
    res.json(ans);
};

module.exports = { createReview, getReview, getCourseDetails};
