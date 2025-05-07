import { Request, Response } from 'express';
import { CreateBookRequest, GetBooksQuery } from '../../interfaces/requests/book.request';
import {
    createBookService,
    getBookByIdService,
    getAllBooksService,
    deleteBookByIdService,
    updateBookByIdService
} from '../services/book.service';
import { IBook } from '../../interfaces/models/Book';
import { BookListResponse } from '../../interfaces/responses/book.response';

export const createBook = async (req: Request<{}, {}, CreateBookRequest>, res: Response) => {
    try {
        const book = await createBookService(req.body);
        return res.status(201).json(book);
    } catch (err: any) {
        const message =
            err.name === 'ValidationError'
                ? Object.values(err.errors).map((e: any) => e.message).join(', ')
                : err.message || 'Unknown error';

        return res.status(500).json({ message: 'Failed to create book', error: message });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await getBookByIdService(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found or invalid ID' });
        }

        return res.status(200).json(book);
    } catch (err: any) {
        return res.status(500).json({ message: 'Failed to fetch book', error: err.message });
    }
};

export const getAllBooks = async (
    req: Request<{}, {}, {}, GetBooksQuery>,
    res: Response<BookListResponse>
): Promise<Response<BookListResponse>> => {
    try {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const search = req.query.search;

        const result = await getAllBooksService(page, limit, search);
        return res.status(200).json(result);
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to fetch books',
            error: err.message
        } as any); 
    }
};

export const updateBookById = async (
    req: Request<{ id: string }, {}, Partial<IBook>>,
    res: Response
) => {
    try {
        const updated = await updateBookByIdService(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ message: 'Book not found or invalid ID' });
        }

        return res.status(200).json(updated);
    } catch (err: any) {
        return res.status(500).json({ message: 'Failed to update book', error: err.message });
    }
};

export const deleteBookById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const success = await deleteBookByIdService(req.params.id);

        if (!success) {
            return res.status(404).json({ message: 'Book not found or invalid ID' });
        }

        return res.status(204).send();
    } catch (err: any) {
        return res.status(500).json({ message: 'Failed to delete book', error: err.message });
    }
};
