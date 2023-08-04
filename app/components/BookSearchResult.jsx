"use client";
import { BookCard } from "./BookCard";

const BookSearchResult = ({ books }) => {

  if(books.length !== 0){
    return (
      <div className="book-title flex justify-center flex-col items-center p-2 ">
        <h3>Search Results</h3>
        <div className="flex flex-row w-full gap-4 justify-between items-center">
          {books.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </div>
      </div>
    );
} else {
    return (<p>Loading Books</p>)
}
};

export default BookSearchResult;
