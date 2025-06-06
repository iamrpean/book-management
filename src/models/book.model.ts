import { Schema, model, Document, Types } from 'mongoose';
import { IBook } from '../interfaces/models/Book';

export interface IBookDocument extends IBook, Document {
    _id: Types.ObjectId;
}

const bookSchema = new Schema<IBookDocument>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genres: { type: [String], required: true },
    stock: { type: Number, required: true }
});

bookSchema.index({ title: 'text', author: 'text' });
bookSchema.index({ genres: 1 });
bookSchema.index({ createdAt: -1 }); 

export const BookModel = model<IBookDocument>('Book', bookSchema);
