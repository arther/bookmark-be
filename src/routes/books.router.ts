import { Router } from "express";
import { addBookByIsbn } from "../services/book.service";

const booksRouter = Router()

booksRouter.post('/', async (req, res) => {
    console.log(req.body)
    if (req.body.isbn) {
        const book = await addBookByIsbn(req.body.isbn)
        res.json(book)
    } else {
        res.status(400).json({ message: 'isbn is required' })
    }
});

export default booksRouter;