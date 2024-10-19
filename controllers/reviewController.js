const { connectDB } = require('../database');

const createReview = async function (req, res, next) {
    const db = await connectDB();
    console.log(req.body);
    const result = await db.collection('reviews').insertOne(req.body);
    res.status(200).json();
    return ''; // Return the created review
};

const getAllReviews = async function (req, res, next) {
    const db = await connectDB();
    return await db.collection('reviews').find().toArray();
};

module.exports = { createReview, getAllReviews };
