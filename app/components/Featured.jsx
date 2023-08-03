"use client";
import { useEffect, useState } from "react";
import { BookCard } from "./BookCard";
import { getFeaturedBooks } from "../api/route";

export const Featured = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const books = await getFeaturedBooks();
        setFeaturedBooks(books);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

    return (
        <div className="book-title flex justify-center flex-col items-center p-2">
        <h3>Top 10 rated Books</h3>
        <div className="flex w-full justify-between flex-row gap-4 ">
          {featuredBooks.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </div>
      </div>
    );
};
