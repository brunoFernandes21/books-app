"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { db } from "../firebase/config";
import { DBBookCard } from "../components/DBBookCard";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

const SavedBooksPage = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const   getUsersSaved = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    const responseWithSingleUser = await getDoc(docRef);
    const singleUserData = responseWithSingleUser.data();
    setBooks(singleUserData.savedBooks)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(!user) {
        router.push('/login')
      }else {
        getUsersSaved(user)
        console.log("user logged in")
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
      savedBooks: arrayRemove(book),
    });
  };

  return (
    <main>
      <h1>These are the books you have saved for later</h1>
      {books.map((book) => {
        return <DBBookCard key={book.bookID} book={book} removeBook={removeBook}/>;
      })}
    </main>
  );
};

export default SavedBooksPage;
