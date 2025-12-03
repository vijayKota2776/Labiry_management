const Book = require('../modules/Books');


getAllBook=async(req,res)=>{
    try{
        const books=await Book.find();
        res.status(200).json(books);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
        console.log(error)
    }
};

getBookById=async (req,res)=>{
    try{
        const book=await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message:'Book Not Found'});
        }
        res.status(200).json(book);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }

}

createBook=(req,res)=>{
    try{
        const { title,author,publishedYear,price,quantity}=req.body;
        if(!title && ! author && !publishedYear && !price && !quantity)
        {
            res.status(400).send('please provide all the feilds');
        }
        const newBook={
            id:books.length+1,
            title,
            author,
            publishedYear,
            price,
            quantity,
            status:'Available'
        }
        books.push(newBook);
        res.status(201).send(newBook);
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

updateBook=(req,res)=>{
    try{
        const book=books.find((book)=>book.id===parseInt(req.params.id));
        if(!book){
            return res.status(404).json({message:"Book Not Found"});
        }

        const {title,author,publishedYear,price,quantity}=req.body;

        if(!title && ! author && !publishedYear && !price && !quantity)
        {
            res.status(400).send('please provide all the feilds');
        }

        book.title=title;
        book.author=author;
        book.publishedYear=publishedYear;
        book.price=price;
        book.quantity=quantity;
        res.status(200).json({message:"Book Updated SuccessFully",data:book});
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
};

deleteBook=(req,res)=>{
    try{
        const bookIndex=books.findIndex((book)=>book.id===parseInt(req.params.id));
        if(!bookIndex===-1){
            return res.status(404).json({message:"Book Not Found"});
        }
        books.splice(bookIndex,1);
        res.status(200).json({message:"Book Deleted SuccessFully"});
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
};

module.exports={getAllBook,getBookById,createBook,updateBook,deleteBook};