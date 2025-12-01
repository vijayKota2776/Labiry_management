const express=require('express');
const bookRouter=require('./src/routers/bookroutes');
const IssueBook = require('./src/routers/IssueBookRoutes')
require('dotenv').config();



const app=express();
// app.use(express.json());


requestLogger=(req,res,next)=>{
    console.log(`${req.method} ${req.path} :${new Data().toIsSting()}`)
    next();
}


app.get('/',(req,res)=>{
    res.json('wellcome to Library Management API');
});

app.get('/health',(req,res)=>{
    res.status(200).json({
        status:"OK",
        message:"Server is Running successfully"
    })
});
app.use(requestLogger);
app.use('/books/',bookRouter);
app.use('/Issue-books/',IssueBook)


const PORT =process.env.port || 4000
app.listen(PORT,()=>{
    console.log(`server is Running in the ${PORT}`);
})