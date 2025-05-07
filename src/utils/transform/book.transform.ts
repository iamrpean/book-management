import { IBookDocument } from '../../models/book.model';
import { BookResponse } from '../../interfaces/responses/book.response';

export const toBookResponse = (doc: IBookDocument | any): BookResponse => ({
    id: doc._id.toString(),
    title: doc.title,
    author: doc.author,
    publishedYear: doc.publishedYear,
    genres: doc.genres,
    stock: doc.stock
});
