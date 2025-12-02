const express = require('express');
const bookRouter = require('./src/router/bookroutes');
const issueBookRouter = require('./src/router/IssueBookRoutes');
const db = require('./src/config/db');
require('dotenv').config();
const userRouter =require ('./src/router/UserRouters')

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
app.use('/user',userRouter)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);

});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});