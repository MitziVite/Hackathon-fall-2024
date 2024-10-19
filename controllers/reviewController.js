const Review = require('../models/reviewModel.js');
const createReview = async function (req, res, next) {
    post = req.body
    form = {
        codeClass: post.codeClass,
        grades: post.grades,
        difficulty: post.difficulty,
        hoursPerWeek: post.hoursPerWeek,
        finalProject: post.finalProject,
        finalTest: post.finalTest,
        overallSatisfaction: post.overallSatisfaction,
        onlinevsperson: post.onlinevsperson,
        term: post.term,
        teacher: post.teacher,
        comment: post.comment,
        multipleProjects: post.multipleProjects,
        multipleTests: post.multipleTests,
        db: post.db,
    }
    review = new Review(form);
    review.createReview();
    res.status(200).json();
    return ''; // Return the created review
};

const getReview = async function (req, res, next) {
    review = new Review();
    const codeClass = req.query.courseID.toUpperCase();
    ans = await review.getAverages(codeClass);
    res.json(ans);
};


module.exports = { createReview, getReview };
