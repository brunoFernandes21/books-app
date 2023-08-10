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

const ReadBooksPage = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const getUsersRead = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    const responseWithSingleUser = await getDoc(docRef);
    const singleUserData = responseWithSingleUser.data();
    setBooks(singleUserData.readBooks)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) {
        router.push('/landing-page')
      }else {
        setUser(currentUser);
        getUsersRead(currentUser)
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
      readBooks: arrayRemove(book),
    });
  };

  return (
    <section className="p-4 bg-white mt-5 rounded-2xl text-slate-800 text-center">
      <h3 className="text-xl" >Marked As Read</h3>
      <div className="flex flex-row flex-wrap w-full gap-2 justify-start items-center">
        {books.map((book) => {
          return (
            <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
          );
        })}
      </div>
    </section>
  );
};

export default ReadBooksPage;
