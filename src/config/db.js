const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URL;
const db = mongoose.connection;

if (!uri) {
    console.error('MONGO_URL is not defined. Check your .env file.');
} else {
    // Connect and attach handlers. Handle the connect promise so rejections do not crash the process.
    mongoose
        .connect(uri)
        .then(() => console.log('Database Connected'))
        .catch((err) => {
            // keep logs clear and avoid unhandled promise rejections
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