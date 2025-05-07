export type BookResponse = {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
};

export type BookListResponse = {
    page: number;
    totalPages: number;
    totalBooks: number;
    books: BookResponse[];
};

export type SingleBookResponse = BookResponse;