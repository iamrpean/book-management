import { Request, Response, NextFunction } from 'express';
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
import { ApiError } from '../../errors/ApiError';

export const createBook = async (
    req: Request<{}, {}, CreateBookRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const book = await createBookService(req.body);
        return res.status(201).json(book);
    } catch (err: any) {
        // validasi mongoose
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map((e: any) => e.message).join(', ');
            return next(new ApiError(400, message));
        }

        next(new ApiError(500, err.message || 'Failed to create book'));
    }
};

export const getBookById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const book = await getBookByIdService(req.params.id);
        if (!book) throw new ApiError(404, 'Book not found or invalid ID');

        return res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

export const getAllBooks = async (
    req: Request<{}, {}, {}, GetBooksQuery>,
    res: Response<BookListResponse>,
    next: NextFunction
): Promise<Response<BookListResponse>> => {
    try {
        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '10', 10);
        const search = req.query.search;

        const result = await getAllBooksService(page, limit, search);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const updateBookById = async (
    req: Request<{ id: string }, {}, Partial<IBook>>,
    res: Response,
    next: NextFunction
) => {
    try {
        const updated = await updateBookByIdService(req.params.id, req.body);
        if (!updated) throw new ApiError(404, 'Book not found or invalid ID');

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

export const deleteBookById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const success = await deleteBookByIdService(req.params.id);
        if (!success) throw new ApiError(404, 'Book not found or invalid ID');

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
