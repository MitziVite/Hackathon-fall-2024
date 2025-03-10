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
class Feedback {
    constructor({ 
        helpfulness = undefined,
        missingClass = undefined,
        className = undefined,
        missingDetails = undefined,
        extraComments = undefined} = {}) {

        this.helpfulness = helpfulness,
        this.missingClass = missingClass,
        this.className = className,
        this.missingDetails = missingDetails,
        this.extraComments = extraComments,
        this.db = db
    }

    async createFeedback() {
        let obj = {
            helpfulness : this.helpfulness,
            missingClass : this.missingClass,
            className : this.className,
            missingDetails : this.missingDetails,
            extraComments : this.extraComments,
        };
        let feedbacks = this.db.collection('feedback')
        let result = await feedbacks.insertOne(obj);
        console.log(result)
    }

}

module.exports = Feedback;
