const revModel = require("../models/reviewModel");
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

Util.getReviews = async function(courseID){

    var result = await fetch(`https://rexysvoice.us/getCourseDetails?courseID=${courseID}`)
    result = await result.json()
    let reviews = result[0]['reviews']
    console.log(reviews)
    var reviewsHTML = '<ul>'

    reviews.forEach((review) =>{
        var reviewHTML = '<li>'
        reviewHTML += '<div id = reviewCard>'
        reviewHTML += '<div class = briefReview>'
        reviewHTML += '<h3>Difficulty:</h3> <p> '+ review['difficulty'] + '</p>'
        reviewHTML += '<h3>Satisfaction:</h3> <p> ' + review['overallSatisfaction'] + '</p>'
        reviewHTML += '<h3>Hours per week:</h3> <p> ' + review['hoursPerWeek'] + '</p>'
        reviewHTML += '</div>'
        reviewHTML += '<hr>'
        reviewHTML += '<div class = mainReview >'
        reviewHTML += '<h3>Grade:</h3> <p> ' + review['grades'] + '</p>'
        reviewHTML += '<h3>Teacher:</h3> <p> ' + review['teacher'] + '</p>'
        reviewHTML += '<h3>Semester:</h3> <p> ' + review['term'] + '</p>'
        reviewHTML += (review['finalTest'] == 1) ? '<h3>Final Test:</h3> <p> Yes </p>': '<h3>Final Test:</h3> <p> No </p>'
        reviewHTML += (review['finalProject'] == 1) ? '<h3>Final Project:</h3> <p> Yes </p>': '<h3>Final Project:</h3> <p> No </p>'
        reviewHTML += '<h3>Evaluation types</h3>'
        reviewHTML += review['evaluationType']
        // reviewHTML += '<ul>' + (review['evaluationType'].forEach((evaluation)=> '<li>' + evaluation + '</li>')) + '</ul>'
        reviewHTML += (review['comment'] == null) ? '': '<h3>Comments:</h3> <p> ' + review['comment'] +' </p>'
        reviewHTML += '</div>'
        reviewHTML += '</li>'
        reviewsHTML += reviewHTML
    })
    reviewsHTML += '</ul>'

    return reviewsHTML
};
module.exports = Util;
