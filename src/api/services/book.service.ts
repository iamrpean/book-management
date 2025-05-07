import mongoose, { UpdateQuery } from 'mongoose';
import { BookModel, IBookDocument } from '../../models/book.model';
import { CreateBookRequest, UpdateBookRequest } from '../../interfaces/requests/book.request';
import { BookListResponse, BookResponse } from '../../interfaces/responses/book.response';
import { IBook } from '../../interfaces/models/Book';
import { toBookResponse } from '../../utils/transform/book.transform';

export const createBookService = async (data: CreateBookRequest): Promise<BookResponse> => {
    const newBook = new BookModel(data);
    const result: IBookDocument = await newBook.save();
    return toBookResponse(result);
};

export const getBookByIdService = async (id: string): Promise<BookResponse | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const book = await BookModel.findById(id).lean().select('-__v');
    return book ? toBookResponse(book) : null; 
};

export const getAllBooksService = async (
    page: number,
    limit: number,
    search?: string
): Promise<BookListResponse> => {
    const skip = (page - 1) * limit;

    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { genres: { $elemMatch: { $regex: search, $options: 'i' } } }
            ]
        }
        : {};

    const [books, totalBooks] = await Promise.all([
        BookModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .select('-__v'),
        BookModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalBooks / limit);

    return {
        page, 
        totalPages,
        totalBooks,
        books: books.map(toBookResponse)
    };
};

export const updateBookByIdService = async (
    id: string,
    updateData: UpdateQuery<IBook>
): Promise<BookResponse | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const updated = await BookModel.findByIdAndUpdate(id, updateData, {
        new: true,
        lean: true
    }).select('-__v');

    return updated ? toBookResponse(updated) : null; 
};

export const deleteBookByIdService = async (id: string): Promise<boolean> => {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await BookModel.findByIdAndDelete(id);
    return !!result;
};
