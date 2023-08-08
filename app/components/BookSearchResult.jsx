"use client";
import { BookCard } from "./APIBookCard";

const BookSearchResult = ({ books }) => {
  if (books.length !== 0) {
    return (
      <div className="flex flex-row flex-wrap w-full gap-2 justify-center items-center">
        {books.map((book) => {
          return <BookCard book={book} key={book.id} />;
        })}
      </div>
    );
  } else {
    return <p>Loading Books</p>;
  }
};

export default BookSearchResult;
