"use client";
import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";

const BookSearchResult = ({ books }) => {

if(books.length !== 0){
    return (
      <div className="book-title flex justify-center flex-col items-center bg-white p-2">
        <h3>Search Results</h3>
        <div className="flex flex-row gap-4 ">
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
