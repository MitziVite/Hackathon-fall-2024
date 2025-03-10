const Feedback = require('../models/feedbackModel.js');
const Review = require('../models/reviewModel.js');


const createReview = async function (req, res, next) {
    try{
        let post = req.body
        let form = {
            codeClass: post.codeClass.replace(' ','').toUpperCase(),
            semester: post.semester, 
            year: post.year,
            grades: post.grades,
            difficulty: parseInt(post.difficulty),
            hoursPerWeek: post.hoursPerWeek,
            evaluationType: post.evaluationType,
            overallSatisfaction: parseInt(post.overallSatisfaction),
            onlinevsperson: post.classType,
            teacher: post.teacher,
            comment: post.comments,
            db: post.db
        }
        let review = new Review(form);
        review.createReview();
        req.flash('message', 'Your feedback was saved successfully')
        res.redirect(`/about/course?courseCode=${post.codeClass.replace(' ','').toUpperCase()}`);
    }
    catch (error) {
        req.flash('notice', 'There was an issue with your submission')
        res.status(501).redirect("/forms/rateClassForm")
    }
};

const getReview = async function (req, res, next) {
    let review = new Review();
    const codeClass = req.query.courseID.toUpperCase();
    let ans = await review.getAverages(codeClass);
    res.json(ans);
};

const getReviewInternal = async function (codeClass) {
    let review = new Review();
    let response = await review.getAverages(codeClass);
    return response;
};


const getCourseDetails = async function (req, res, next) {
    let review = new Review();
    const codeClass = req.query.courseID.toUpperCase();
    let ans = await review.getClassesWithReviews(codeClass);
    res.json(ans);
};


const uploadFeedback = async function (req, res, next) {
    try {
        let post = req.body
        let form = {
            helpfulness : post.helpfulness,
            missingClass : post.missingClass,
            className : post.className,
            missingDetails : post.missingDetails,
            extraComments : post.extraComments,
        }

        let feedback = new Feedback(form);
        feedback.createFeedback();
        req.flash('message', 'Your feedback is important to us')
        const errors = req.session.errors || null;
        req.session.errors = null; 
        res.redirect("/");
        // res.render("index", { title: "Search for Courses", errors, isHomePage: req.path === '/'});
      } catch (error) {
        console.error("Error:", error);
        next(new Error("Error Rendering"));
      }
    

}


module.exports = { createReview, getReview, getCourseDetails, getReviewInternal, uploadFeedback};
