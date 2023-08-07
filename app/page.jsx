"use client";
import { useState, useEffect } from "react";
import { Featured } from "./components/Featured";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import BookSearchResult from "./components/BookSearchResult";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  let router = useRouter();

  const [books, setBooks] = useState([]);
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  if (user) {
    return (
      <main>
        <section className="block mt-5 p-4 text-center text-xl ">
          <h2 className="text-4xl font-bold mb-2">
            Welcome to MyBooks! 
          </h2>
          <p>
          Search for books to add to your favourites, your
            currently reading list, and save for later
          </p>
        </section>
        <hr />
        <Search setBooks={setBooks} />
        {books.length > 0 && (
          <div className="p-4 bg-white mt-5 mb-10 rounded-2xl text-slate-800 text-center">
            <h3 className="text-xl">Search Results</h3>
            <BookSearchResult books={books} />
          </div>
        )}
        {/* <hr /> */}
        <section className="mt-10">
          <Featured />
        </section>
      </main>
    );
  } else {
    return <LandingPage />;
  }
}
