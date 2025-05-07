import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Management API',
            version: '1.0.0',
            description: 'API for managing books',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Book: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        publishedYear: { type: 'integer' },
                        genres: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                        stock: { type: 'integer' },
                    },
                },
                BookListResponse: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer' },
                        totalPages: { type: 'integer' },
                        totalBooks: { type: 'integer' },
                        books: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Book' },
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        error: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['src/api/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
