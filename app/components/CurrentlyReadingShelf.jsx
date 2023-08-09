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
import Link from "next/link";

const CurrentlyReadingShelf = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const getCurrentlyReading = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    try {
      const responseWithSingleUser = await getDoc(docRef);
      const singleUserData = responseWithSingleUser.data();
      setBooks(singleUserData.currentlyReading);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        getCurrentlyReading(currentUser);
      }
    });
  }, []);

  const removeBook = async (book, id) => {
    // try and do with state
    const filteredBooks = books.filter((book) => {
      return book.bookID !== id;
    });
    setBooks(filteredBooks);
    const docRef = doc(db, "userData", user.uid);
    await updateDoc(docRef, {
      currentlyReading: arrayRemove(book),
    });
  };
  return (
    <section className="book-title mt-10 flex justify-center flex-col items-center pt-4 p-2 bg-white text-slate-800 rounded-2xl">
      <Link className="text-2xl font-bold" href="/currently-reading">Currently Reading</Link>
      <div className="flex justify-start flex-row gap-4 p-4 overflow-x-scroll w-full">
        {books.map((book) => {
          return (
            <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
          );
        })}
      </div>
    </section>
  );
};

export default CurrentlyReadingShelf;
