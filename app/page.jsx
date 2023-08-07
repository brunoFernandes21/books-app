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
import { useRouter } from "next/navigation";
import AllUsersFavourites from "./components/AllUsersFavourites"


export default function Home() {
  let router = useRouter()

  const [books, setBooks] = useState([]);
  const {user, setUser, loading, setLoading, } = useContext(AuthContext)
  const[error, setError]= useState(false)
  useEffect(() => {
    setError(false)
    onAuthStateChanged(auth, (user) => {
      setUser(user)
     }
    )
   }
   , [])
   
   if (user) {
    return (
      <main>
        <Search setBooks={setBooks} books={books} />
        <section className="flex justify-center mt-10 p-10 border-4 border-red-600">
          <p>Welcome to MyBooks</p>
          <p>Search for books to add to your favourites</p>
          <p>your currently reading list, and save for later</p>
        </section>
        {!error && (
          <div className=" border-orange border-4 p-10">
            <BookSearchResult books={books} setError={setError} error={error} />
          </div>
        )}
        <section className="mt-40">
          <Featured />
        </section>
        <section>
          <AllUsersFavourites />
        </section>
      </main>
    );
   } else {
    return (
      <LandingPage />
    )
   }
}
