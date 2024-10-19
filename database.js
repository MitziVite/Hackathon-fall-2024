const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env file
const uri = process.env.MONGOKEY;
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log('MongoDB connected successfully');
        return await client.db(); // Return the database object
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

//client2 = connectDB();

module.exports = { connectDB };
