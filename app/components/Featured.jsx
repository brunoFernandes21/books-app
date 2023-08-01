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
        <div className="book-title flex justify-center flex-col items-center bg-white p-2">
        <h3>Featured</h3>
        <div className="flex flex-row gap-4 ">
          {featuredBooks.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </div>
      </div>
    );
};