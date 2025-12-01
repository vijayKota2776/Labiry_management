const express=require ('express');

const {getAllBook,getBookById,createBook,updateBook,deleteBook}=require("../controllers/BookControllers.js");

const router =express.Router();

router.get('/',getAllBook);
router.get('/:id',getBookById);
router.post('/',createBook);
router.post('/:id',updateBook);
router.post('/:id',deleteBook);

module.exports=router;