export interface BookData {
  author: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: string;
  title: string;
  status: number;
}

interface Book {
  book: BookData;
  status: number;
}

export interface BooksState {
  [x: string]: any;
  books: Book[];
  bookId: number | null;
  loading: "idle" | "pending";
  error: number | null;
  currentRequestId?: string;
}
