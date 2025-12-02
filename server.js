const express = require('express');
const bookRouter = require('./src/routers/bookroutes');
const issueBookRouter = require('./src/routers/IssueBookRoutes');
const db = require('./src/config/db');
require('dotenv').config();

const app = express();


app.use(express.json());


const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} : ${new Date().toISOString()}`);
    next();
};

app.use(requestLogger);


app.get('/', (req, res) => {
    res.json('Welcome to Library Management API');
});


app.get('/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running successfully"
    });
});


app.use('/books', bookRouter);
app.use('/issue-books', issueBookRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Global handlers: log promise rejections / uncaught exceptions so we can debug connection/auth failures.
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // optionally: close server or take recovery action here
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // If you want to restart the process after a crash, you could do cleanup then exit:
    // process.exit(1);
});