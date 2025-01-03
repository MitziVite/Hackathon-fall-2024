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
    constructor({ 
                codeClass = undefined, grades = undefined, difficulty = undefined, 
                hoursPerWeek = undefined, finalProject = undefined, finalTest = undefined, 
                overallSatisfaction = undefined, onlinevsperson = undefined, term = undefined, 
                teacher = undefined, comment = undefined, multipleTests = undefined, 
                multipleProjects = undefined } = {}) {

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
        this.comment = comment;
        this.multipleProjects = multipleProjects;
        this.multipleTests = multipleTests;
        this.db = db;
    }



    async getAverages(codeClass) {
        const collection = await this.db.collection('reviews'); 

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
            teacher: this.teacher,
            comment: this.comment,
            multipleProjects: this.multipleProjects,
            multipleTests: this.multipleTests
        };
        var result = await this.db.collection('reviews').insertOne(obj);
    }
    
    async getClassesWithReviews(codeClass) {
        try {
            const collection = db.collection('classes'); // The Classes collection
            const results = await collection.aggregate([
                {
                    $lookup: {
                        from: 'reviews',           // The collection to join
                        localField: '__catalogCourseId',        // The field from the Classes collection
                        foreignField: 'codeClass', // The field from the Reviews collection
                        as: 'reviews'             // The name of the new array field for the reviews
                    }
                },
                {$match:{
                    __catalogCourseId: { $in: [codeClass] } // Filter for specific classes
                }}
            ]).toArray();
    
            return results; // Return the array of classes with their reviews
        } catch (error) {
            console.error('Error retrieving classes with reviews:', error);
            return null; // Handle the error as needed
        }
    }

}

module.exports = Review;
