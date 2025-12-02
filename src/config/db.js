const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL;
const db = mongoose.connection;

mongoose.connect('MONGO_URL');

if (!uri) {
    console.error('MONGO_URL is not defined. Check your .env file.');
} else {

    mongoose
        .connect(uri)
        .then(() => console.log('Database Connected'))
        .catch((err) => {

            console.error('Database connection error (initial):', err);
        });

    db.on('connected', () => {
        console.log('Database connection established');
    });

    db.on('disconnected', () => {
        console.warn('Database Disconnected');
    });

    db.on('error', (error) => {
        console.error('Database Error:', error);
    });
}

module.exports = db;