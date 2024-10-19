// Define the review structure (no strict schema like Mongoose)
class Review {
    constructor({ form, grades, dificulty, hoursPerWeek, finalProject, finalTest, overallSatisfaction, onlinevsperson, term, teacher }) {
        this.form = form;
        this.grades = grades;
        this.dificulty = dificulty;
        this.hoursPerWeek = hoursPerWeek;
        this.finalProject = finalProject;
        this.finalTest = finalTest;
        this.overallSatisfaction = overallSatisfaction;
        this.onlinevsperson = onlinevsperson;
        this.term = term;
        this.teacher = teacher;
    }
}

module.exports = Review;
