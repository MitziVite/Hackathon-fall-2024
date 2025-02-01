const revModel = require("../models/reviewModel");
const reviewController = require('../controllers/reviewController');
const Util = {};

// Genera el formulario HTML dinámicamente
Util.getNav = async function (req, res, next) {
    
    return formHTML;
};



// Manejo de errores
Util.handleErrors = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
};


Util.createOutcomes = function(outcomesList){

    let outcomeHTML = "<ul>";
    outcomesList.forEach(outcome => {
        outcomeHTML += `<li>${outcome['value']}</li>`;
    });
    outcomeHTML += `</ul>`
    return outcomeHTML;
}

result = {
    _id: '6713e1b628578f7973e52b43',
    codeClass: 'ENG301',
    grades: 'B',
    difficulty: 4,
    hoursPerWeek: 19,
    finalProject: 1,
    finalTest: 1,
    overallSatisfaction: 2,
    onlinevsperson: 'In-Person',
    term: 'Fall 2023',
    teacher: 'Ms. Lee'
}


Util.getReviews =  function(reviews) {

    let reviewsHTML = '';

    reviews.forEach((review) => {
        // Review card structure
        let reviewHTML = '<div id="reviewCard">';
        
        // Review header (Customer info + Rating)
        reviewHTML += '<div class="mainReview">';
        reviewHTML += '<div class="reviewStats">';
        
        // Avatar and Customer Info
        reviewHTML += '<div>';
        reviewHTML += '<h3 class="customer-name">Teacher: ' + review['teacher'] + '</h3>';
        reviewHTML += '<p class="review-date">Term: ' + review['semester'] + ' ' + review['year'] + '</p>'; // Using term as review date
        reviewHTML += '</div>';
        
        reviewHTML += '</div>'; // Closing reviewStats
        
        // Rating
        reviewHTML += '<div class="rating">';
        reviewHTML += '<p>Satisfaction: </p>';
        const starCount = Math.round(review['overallSatisfaction'] / 2); // Assuming a 0-10 scale for overallSatisfaction
        for (let i = 0; i < 5; i++) {
            reviewHTML += '<span class="star' + (i < starCount ? ' filled' : '') + '">★</span>';
        }
        reviewHTML += '</div>';
        
        reviewHTML += '</div>'; // Closing mainReview

        // Verified Badge
        if (review['verifiedPurchase']) {
            reviewHTML += '<div class="verified-badge">Verified Purchase</div>';
        }

        // Separator line
        reviewHTML += '<hr>';

        // Review content (Product details and Customer comment)
        reviewHTML += '<div class="review-content">';
        
        // Product Details (Difficulty, Hours per Week, etc.)
        reviewHTML += '<div class="product-details">';
        
        // Adding Grade, Difficulty, Evaluation Types, Hours per Week
        reviewHTML += '<h4>Grade</h4>';
        reviewHTML += '<p>' + (review['grades'] || 'N/A') + '</p>';
        
        reviewHTML += '<h4>Difficulty</h4>';
        reviewHTML += '<p>' + (review['difficulty'] || 'N/A') + '</p>';

        reviewHTML += '<h4>Hours per Week</h4>';
        reviewHTML += '<p>' + (review['hoursPerWeek'] || 'N/A') + '</p>';

        // Adding Evaluation Types (if available)
        if (review['evaluationType'] && Array.isArray(review['evaluationType'])) {
            reviewHTML += '<h4>Evaluation Types</h4>';
            reviewHTML += '<ul>';
            review['evaluationType'].forEach(evaluation => {
                reviewHTML += '<li>' + evaluation + '</li>';
            });
            reviewHTML += '</ul>';
        }
        else if (review['evaluationType']){
            reviewHTML += '<h4>Evaluation Types</h4>';
            reviewHTML += '<p>' + review['evaluationType'] +'</p>';
        } 
        else {
            reviewHTML += '<h4>Evaluation Types</h4>';
            reviewHTML += '<p>No evaluations provided.</p>';
        }

        reviewHTML += '</div>'; // Closing product-details
        
        // Customer Comment
        reviewHTML += '<div class="customer-comment">';
        reviewHTML += '<h4>Customer Comment</h4>';
        reviewHTML += '<p>' + (review['comment'] ? review['comment'] : 'No comments provided.') + '</p>';
        reviewHTML += '</div>';
        
        reviewHTML += '</div>'; // Closing review-content

        reviewHTML += '</div>'; // Closing review-card
        reviewsHTML += reviewHTML;
    });

    return reviewsHTML;
};

Util.createSimilarCourses = async function(courseList){
    let coursesHTML = '<ul>';

    // Use map to create an array of promises and await them
    const coursePromises = courseList.map(async (course) => {
        let response = await reviewController.getReviewInternal(course.courseCode);        
        // Review card structure
        let courseHTML = '<div id="courseCard">';
        courseHTML += '<li>';
        courseHTML += '<div style="display:flex; justify-content:space-evenly;">';
        courseHTML += '<h2>' + course.courseName + '</h2>';
        courseHTML += ` <h4> Satisfaction Rate:  ${response['averageOverallSatisfaction']}</h4>`;
        courseHTML += ` <h4> Difficulty Rate:  ${response['averageDifficulty']} </h4>`;
        courseHTML += '</div>';
        courseHTML += '<p>' + course.courseCode + '</p>';
        courseHTML += '</div>';
        courseHTML += '</li>';
        
        return courseHTML; // Return the HTML for each course
    });

    // Wait for all promises to resolve and concatenate them into coursesHTML
    const courseHTMLs = await Promise.all(coursePromises);
    coursesHTML += courseHTMLs.join(''); // Join the HTML parts together
    coursesHTML += '</ul>';

    return coursesHTML;
};


module.exports = Util;
