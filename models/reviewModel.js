const { connectDB } = require('../database');


var db = null;

connectDB()
.then(result => {
    db = result; // "Hello, World!"
})
.catch(error => {
    console.error(error);
});

// Define the review structure (no strict schema like Mongoose)
class Review {
    constructor({ 
        codeClass = undefined,
        semester = undefined,
        year = undefined,
        grades = undefined,
        difficulty = undefined,
        hoursPerWeek = undefined,
        evaluationType = undefined,
        overallSatisfaction = undefined,
        onlinevsperson = undefined,
        teacher = undefined,
        comment = undefined} = {}) {

        this.codeClass = codeClass,
        this.semester = semester,
        this.year = year,
        this.grades = grades,
        this.difficulty = difficulty,
        this.hoursPerWeek = hoursPerWeek,
        this.evaluationType = evaluationType,
        this.overallSatisfaction = overallSatisfaction,
        this.onlinevsperson = onlinevsperson,
        this.teacher = teacher,
        this.comment = comment,
        this.db = db
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
        let obj = {
            codeClass: this.codeClass,
            semester: this.semester,
            year: this.year,
            grades: this.grades,
            difficulty: this.difficulty,
            hoursPerWeek: this.hoursPerWeek,
            evaluationType: this.evaluationType,
            overallSatisfaction: this.overallSatisfaction,
            onlinevsperson: this.onlinevsperson,
            teacher: this.teacher,
            comment: this.comment,
        };
        let reviews = this.db.collection('reviews')
        let result = await reviews.insertOne(obj);
        console.log(result)
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
                }},
                {
                    $addFields: {
                        reviews: {
                            $sortArray: {
                                input: "$reviews",
                                sortBy: { year: -1 } // Sort by the year field in ascending order
                            }
                        }
                    }
                }
            ]).toArray();
    
            return results; // Return the array of classes with their reviews
        } catch (error) {
            console.error('Error retrieving classes with reviews:', error);
            return null; // Handle the error as needed
        }
    }
    
    async getSimilarClassesByCode(code) {
        try {
            const collection = db.collection('classes'); // The Classes collection
            const results = await collection.aggregate([
                {
                    $match: {
                        __catalogCourseId: { $regex: `^${code}` } // Case-insensitive search for 'starts with'
                    }
                }
            ]).toArray()
        
            return results; // Return the array of classes
        } catch (error) {
            console.error('Error retrieving classes:', error);
            return null; // Handle the error as needed
        }
    }

    async getSimilarClassesByName(name) {
        try {

            // Convert input into an array of words
            const words = name.trim().split(/\s+/); // Split by spaces

            // Build regex patterns to match all words (in any order)
            const regexPatterns = words.map(word => `(?=.*${word})`).join("");

            const regex = new RegExp(regexPatterns, "i"); // Case-insensitive regex
            const collection = db.collection('classes'); // The Classes collection
            const results = await collection.aggregate([
                {
                    $match: {
                        title: { $regex: regex } // Case-insensitive search for 'starts with'
                    }
                }
            ]).toArray()
        
            return results; // Return the array of classes
        } catch (error) {
            console.error('Error retrieving classes:', error);
            return null; // Handle the error as needed
        }
    }
    

}

module.exports = Review;
