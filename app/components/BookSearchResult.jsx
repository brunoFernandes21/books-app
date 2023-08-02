"use client"
import { SearchBookCard } from "./SearchBookCard";

const BookSearchResult = ({ books }) => {
  if (books.length > 0) {
    return (
      <div className="book-title flex justify-center flex-col items-center bg-white p-2">
        <h3>Search Results</h3>
        <div className="flex flex-row gap-4 ">
            {books.map((book) => {
              return <SearchBookCard book={book} key={book.id} />;
            })}
          </div>
      </div>
    );
  }
};

export default BookSearchResult;
