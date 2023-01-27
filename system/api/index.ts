export const api = {
  readBookList() {
    return Promise.resolve([
      {
        id: "book-1",
        title: "Book 1 Title",
        author: { id: "author-1", name: "Author 1 Name" }
      },
      {
        id: "book-2",
        title: "Book 2 Title",
        author: { id: "author-2", name: "Author 2 Name" }
      }
    ]);
  },

  readAuthorList() {
    return Promise.resolve([
      { id: "author-1", name: "Author 1 Name" },
      { id: "author-2", name: "Author 2 Updated Name" }
    ]);
  }
};
