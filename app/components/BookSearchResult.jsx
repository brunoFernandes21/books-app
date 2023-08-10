"use client";
import { BookCard } from "./APIBookCard";

const BookSearchResult = ({ books, error }) => {
  console.log(books, "book component")
  if (error === false) {
    return (
      <div className="flex flex-row flex-wrap w-full gap-2 justify-center items-center">
        {books !== undefined ? (
          books.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })
        ) : (
          <div className="p-4 bg-white rounded-2xl text-slate-800 text-center  lg:w-1/2">
            <p className="p-4 text-xl font-bold text-white border-2 rounded bg-red-300 border-red-500">No books found</p>
          </div>
        )}
      </div>
    );
  } else {
    return <p>Loading Books</p>;
  }
};

export default BookSearchResult;
