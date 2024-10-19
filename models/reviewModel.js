const { connectDB } = require('../database');

// Define the review structure (no strict schema like Mongoose)

var db = null;

connectDB()
    .then(result => {
        db = result; // "Hello, World!"
    })
    .catch(error => {
        console.error(error);
    });

class Review {
    constructor({ codeClass = undefined, grades = undefined, difficulty = undefined, hoursPerWeek = undefined, finalProject = undefined, finalTest = undefined, overallSatisfaction = undefined, onlinevsperson = undefined, term = undefined, teacher = undefined } = {}) {
        this.codeClass = codeClass;
        this.grades = grades;
        this.difficulty = difficulty;
        this.hoursPerWeek = hoursPerWeek;
        this.finalProject = finalProject;
        this.finalTest = finalTest;
        this.overallSatisfaction = overallSatisfaction;
        this.onlinevsperson = onlinevsperson;
        this.term = term;
        this.teacher = teacher;
        this.db = db;
    }



    async getAverages(codeClass) {
        const collection = await this.db.collection('reviews'); // Replace with your collection name

        const averages = await collection.aggregate([
            { $match: { codeClass } },
            {
                $group: {
                    _id: null,
                    averageHoursPerWeek: { $avg: "$hoursPerWeek" },
                    averageOverallSatisfaction: { $avg: "$overallSatisfaction" },
                    averageDifficulty: { $avg: "$difficulty" }
                }
            }
        ]).toArray();

        return averages.length > 0 ? averages[0] : {
            averageHoursPerWeek: 0,
            averageOverallSatisfaction: 0,
            averageDifficulty: 0
        };
    }

    async createReview() {
        var obj = {
            codeClass: this.codeClass,
            grades: this.grades,
            difficulty: this.difficulty,
            hoursPerWeek: this.hoursPerWeek,
            finalProject: this.finalProject,
            finalTest: this.finalTest,
            overallSatisfaction: this.overallSatisfaction,
            onlinevsperson: this.onlinevsperson,
            term: this.term,
            teacher: this.teacher
        };
        var result = await this.db.collection('reviews').insertOne(obj);
    }

}

module.exports = Review;
