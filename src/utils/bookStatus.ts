export const bookStatus = (book: { status: number }) => {
  if (book.status === 1) {
    return "Reading";
  }
  if (book.status === 2) {
    return "Finished";
  }

  return "New";
};
