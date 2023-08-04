"use client";
import { useState, useEffect } from "react";
import { Featured } from "./components/Featured";
import LandingPage from "./components/LandingPage";
import Search from "./components/Search";
import BookSearchResult from "./components/BookSearchResult";
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "@/app/firebase/config"
import {useContext} from 'react'
import {AuthContext} from "@/app/context/AuthContext"


export default function Home() {
  const [books, setBooks] = useState([]);
  const {user, setUser, loading, setLoading, } = useContext(AuthContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
       setLoading(false)
     })
   }, [])
   
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
