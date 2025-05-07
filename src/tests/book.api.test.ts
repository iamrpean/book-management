import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { BookModel } from '../models/book.model';

const testMongoUri = process.env.MONGO_URL || 'mongodb://mongo:27017/book-api-test';

beforeAll(async () => {
    await mongoose.connect(testMongoUri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

afterEach(async () => {
    await BookModel.deleteMany({});
});

describe('Book API Endpoints', () => {
    it('should create a book', async () => {
        const payload = {
            title: 'Test Book',
            author: 'John Doe',
            publishedYear: 2023,
            genres: ['Test'],
            stock: 5,
        };

        const res = await request(app).post('/api/v1/books').send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(payload.title);
    });

    it('should get all books', async () => {
        await BookModel.create({
            title: 'Book A',
            author: 'Author A',
            publishedYear: 2020,
            genres: ['Genre'],
            stock: 10,
        });

        const res = await request(app).get('/api/v1/books');
        expect(res.statusCode).toBe(200);
        expect(res.body.books.length).toBeGreaterThan(0);
    });

    it('should update a book', async () => {
        const book = await BookModel.create({
            title: 'Before Update',
            author: 'Author',
            publishedYear: 2020,
            genres: ['Fiction'],
            stock: 10
        });

        const res = await request(app)
            .put(`/api/v1/books/${book._id}`)
            .send({ title: 'After Update' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('After Update');
    });

    it('should delete a book', async () => {
        const book = await BookModel.create({
            title: 'To Delete',
            author: 'Someone',
            publishedYear: 2021,
            genres: ['Drama'],
            stock: 7
        });

        const res = await request(app).delete(`/api/v1/books/${book._id}`);
        expect(res.statusCode).toBe(200);
    });

    it('should reject invalid data types on create', async () => {
        const invalidPayload = {
            title: 'Invalid',
            author: 'Author',
            publishedYear: 'not-a-number',
            genres: 'not-an-array',
            stock: 'ten'
        };

        const res = await request(app).post('/api/v1/books').send(invalidPayload);

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBeDefined();
        expect(res.body.message).toMatch(/Cast to Number failed|ValidationError/); 
    });
});
