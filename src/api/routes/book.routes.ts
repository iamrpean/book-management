import { Router } from 'express';
import { createBook, getBookById, getAllBooks, updateBookById, deleteBookById } from '../controllers/book.controller';

const router = Router();

router
    .route('/')
    .post(createBook)
    .get(getAllBooks);

router
    .route('/:id')
    .get(getBookById)
    .put(updateBookById)
    .delete(deleteBookById);


export default router;
