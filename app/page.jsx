"use client";
import { useState } from "react";
import { Featured } from "./components/Featured";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import BookSearchResult from "./components/BookSearchResult";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState("Jav")

  if (user) {
    return (
      <main>
        <Search setBooks={setBooks} />

        <section className="flex justify-center mt-10 p-10 border-4 border-red-600">
          <p>Welcome to MyBooks</p>
          <p>Search for books to add to your favourites</p>
          <p>your currently reading list, and save for later</p>
        </section>
        {books.length > 0 && (
          <div className=" border-orange border-4 p-10">
            <BookSearchResult books={books} />
          </div>
        )}
        {/* {books.length === 0 && <p>Sorry, could not find books! Try again.</p>} */}
        <section className="mt-40">
          <Featured />
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <section>
           <LandingPage/>
        </section>
      </main>
    );
  }
}
