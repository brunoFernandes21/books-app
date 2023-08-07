"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";
import { DBBookCard } from "../components/DBBookCard";


const FavouritesShelf = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);
    let router = useRouter();
    const [books, setBooks] = useState([]);
  
    const getUsersFavourites = async (user) => {
      const docRef = doc(db, "userData", user.uid);
      const responseWithSingleUser = await getDoc(docRef);
      const singleUserData = responseWithSingleUser.data();
      setBooks(singleUserData.favourites);
    };
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (!user) {
          router.push("/login");
        } else {
          getUsersFavourites(user);
          console.log("user logged in");
        }
      });
    }, []);
  
  
    const removeBook = async (book, id) => {
      // try and do with state
      const filteredBooks = books.filter((book) => {
        return book.bookID !== id
      })
      setBooks(filteredBooks)
      const docRef = doc(db, "userData", user.uid);
      await updateDoc(docRef, {
        favourites: arrayRemove(book),
      });
    };
  
    return (
      <section className="flex flex-row flex-wrap">
        {books.map((book) => {
          return (
            <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
          );
        })}
      </section>
    );
}

export default FavouritesShelf