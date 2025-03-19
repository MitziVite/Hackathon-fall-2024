const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

// Initialize the DynamoDB client
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const db = DynamoDBDocumentClient.from(client);

// Define the review structure
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
        comment = undefined
    } = {}) {
        this.codeClass = codeClass;
        this.semester = semester;
        this.year = year;
        this.grades = grades;
        this.difficulty = difficulty;
        this.hoursPerWeek = hoursPerWeek;
        this.evaluationType = evaluationType;
        this.overallSatisfaction = overallSatisfaction;
        this.onlinevsperson = onlinevsperson;
        this.teacher = teacher;
        this.comment = comment;
    }

    async createReview() {
        try {
            const obj = {
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

            const command = new PutCommand({
                TableName: "Reviews",
                Item: obj,
            });

            await db.send(command);
            console.log("Review added successfully");
        } catch (error) {
            console.error("Error adding review:", error);
        }
    }

    async getAverages(codeClass) {
        try {
            const command = new QueryCommand({
                TableName: "Reviews",
                KeyConditionExpression: "codeClass = :codeClass",
                ExpressionAttributeValues: { ":codeClass": codeClass }
            });

            const { Items } = await db.send(command);

            if (!Items || Items.length === 0) {
                return { averageHoursPerWeek: 0, averageOverallSatisfaction: 0, averageDifficulty: 0 };
            }

            const total = Items.length;
            const avgHoursPerWeek = Items.reduce((sum, r) => sum + (r.hoursPerWeek || 0), 0) / total;
            const avgOverallSatisfaction = Items.reduce((sum, r) => sum + (r.overallSatisfaction || 0), 0) / total;
            const avgDifficulty = Items.reduce((sum, r) => sum + (r.difficulty || 0), 0) / total;

            return { averageHoursPerWeek: avgHoursPerWeek, averageOverallSatisfaction: avgOverallSatisfaction, averageDifficulty: avgDifficulty };
        } catch (error) {
            console.error("Error fetching averages:", error);
            return null;
        }
    }

    async getClassesWithReviews(codeClass) {
        try {
            const command = new QueryCommand({
                TableName: "Reviews",
                KeyConditionExpression: "codeClass = :codeClass",
                ExpressionAttributeValues: { ":codeClass": codeClass }
            });

            const { Items } = await db.send(command);
            return Items || [];
        } catch (error) {
            console.error("Error retrieving classes with reviews:", error);
            return null;
        }
    }

    async getSimilarClassesByCode(code) {
        try {
            const command = new ScanCommand({
                TableName: "Classes",
                FilterExpression: "begins_with(__catalogCourseId, :code)",
                ExpressionAttributeValues: { ":code": code }
            });

            const { Items } = await db.send(command);
            return Items || [];
        } catch (error) {
            console.error("Error retrieving similar classes:", error);
            return null;
        }
    }

    async getSimilarClassesByName(name) {
        try {
            const words = name.trim().split(/\s+/);
            const regex = words.map(word => `(?=.*${word})`).join("");

            const command = new ScanCommand({
                TableName: "Classes",
                FilterExpression: "contains(title, :name)",
                ExpressionAttributeValues: { ":name": regex }
            });

            const { Items } = await db.send(command);
            if (!Items || Items.length === 0) {
                throw new Error("Class not found");
            }

            return Items;
        } catch (error) {
            console.error("Error retrieving classes:", error);
            return null;
        }
    }
}

module.exports = Review;
