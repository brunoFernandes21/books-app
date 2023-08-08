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
import AllUsersFavourites from "./components/AllUsersFavourites"

export default function Home() {
  const [books, setBooks] = useState([]);
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const[error, setError]= useState(false)
  useEffect(() => {
    setError(false)
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        setUser(currentUser)
      }
    });
  }, []);
  console.log(user)
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
        <Search setBooks={setBooks} books={books} />
        {!error && books ? (
              <div className="p-4 bg-white mt-5 mb-10 rounded-2xl text-slate-800 text-center">
              <h3 className="text-xl">Search Results</h3>
            <BookSearchResult books={books} setError={setError} error={error} />
          </div>
        ) : <p>No books found</p>}
                <section className="map mt-10 rounded">
        <iframe className="rounded-2xl" src="https://map.proxi.co/r/Uscl2AFwsvD98RG3MMYd" allow="geolocation; clipboard-write" width="100%" height="625px" style={{borderWidth: + "0px"}} allowfullscreen></iframe> <div style={{fontFamily: + "Sans-Serif", fontSize: + "12px", color: + "#000000", opacity: + "0.5", paddingTop: + "5px"}}> powered by <a href="https://www.proxi.co/?utm_source=poweredbyproxi" style={{color: + "#000000"}} target="_blank">Proxi</a> </div>
        </section>
        <section className="mt-10">
          <Featured />
        </section>
        <section>
          <AllUsersFavourites />
        </section>
      </main>
    );
  } 
  else {
    return <LandingPage />;
  }
}
