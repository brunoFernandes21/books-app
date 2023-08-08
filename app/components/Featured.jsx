"use client";
import { useEffect, useState } from "react";
import { BookCard } from "./APIBookCard";
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
        <div className="p-4 bg-white mt-5 rounded-2xl text-slate-800 text-center">
        <h3>Top 10 rated Books</h3>
        <div className="flex flex-row flex-wrap w-full gap-2 justify-center items-center">
          {featuredBooks.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </div>
      </div>
    );
};
