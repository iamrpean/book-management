export type CreateBookRequest = {
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
};

export type UpdateBookRequest = Partial<{
    title: string;
    author: string;
    publishedYear: number;
    genres: string[];
    stock: number;
}>;


export type GetBooksQuery = {
    page?: string;
    limit?: string;
    search?: string;
};