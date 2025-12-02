const IssueBookModel = require('../modules/IssueBookScheme');
const Book = require('../modules/Books');
const User = require('../modules/userSchema');


const issueBook = async (req, res) => {
    try {
        const { bookId, bookName, studentId, studentName, issueDate, returnDate } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (book.quantity < 1) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        const newIssueBook = {
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate,
            status: "ISSUED",
            createdAt: Date.now()
        };

        const issueBookEntry = new IssueBookModel(newIssueBook);
        await issueBookEntry.save();


        book.quantity = book.quantity - 1;
        await book.save();

        res.status(201).json({ message: 'Book was issued', data: issueBookEntry });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const returnBook = async (req, res) => {
    try {
        const issueBookEntry = await IssueBookModel.findById(req.params.id);
        if (!issueBookEntry) {
            return res.status(404).json({ message: 'Issued book not found' });
        }

        if (issueBookEntry.status === "RETURNED") {
            return res.status(400).json({ message: 'Book already returned' });
        }

        issueBookEntry.status = "RETURNED";
        await issueBookEntry.save();

        const book = await Book.findById(issueBookEntry.bookId);
        book.quantity = book.quantity + 1;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully', data: issueBookEntry });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { issueBook, returnBook };