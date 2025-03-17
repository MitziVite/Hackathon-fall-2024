const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
require('dotenv').config(); // Load environment variables from .env file

// Set up the DynamoDB client
const client = new DynamoDBClient({
    region: 'us-east-1', // Specify your region or use an environment variable
    credentials: {
        accessKeyId: "empty",  // Your AWS access key
        secretAccessKey: "empty", // Your AWS secret access key
    },
});

const connectDB = async () => {
    try {
        // The DynamoDB client is stateless, so no explicit "connect" method is needed.
        console.log('DynamoDB client initialized successfully');
        return client;
    } catch (error) {
        console.error('DynamoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = { connectDB };