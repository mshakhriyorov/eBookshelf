interface BookData {
  authot: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: Date;
  title: string;
}

interface Book {
  book: BookData;
  status: number;
}

export interface BooksState {
  books: Book[];
  bookId: number | null;
  loading: "idle" | "pending";
  error: number | null;
  currentRequestId?: string;
}
