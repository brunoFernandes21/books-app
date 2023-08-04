"use client";
import React, { useState, useEffect } from "react";
import { BookCard } from "../components/BookCard";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const FavouritesPage = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(!user) {
        router.push('/login')
      }else {
        console.log("user logged in")
      }
    });
  }, []);

  //make a call to firebase and retrieve the favourite books
  //once we get all the books back, we'll set books to the books we get back
  // then we'll display them in cards
  //grid or flexbox
  return (
    <main>
      <h1>These are your favourite books</h1>
      {books.map((book) => {
        return <BookCard key={book.id} book={book} />;
      })}
    </main>
  );
};

export default FavouritesPage;
