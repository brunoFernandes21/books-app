"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { DBBookCard } from "../components/DBBookCard";

const ReadBooksPage = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const   getUsersRead = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    const responseWithSingleUser = await getDoc(docRef);
    const singleUserData = responseWithSingleUser.data();
    console.log(singleUserData.readBooks)
    setBooks(singleUserData.readBooks)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      getUsersRead(user)
      if(!user) {
        router.push('/login')
      }else {
        console.log("user logged in")
      }
    });
  }, []);

  return (
    <main>
      <h1>You're a bookworm! See what you've read below</h1>
      {books.map((book) => {
        return <DBBookCard key={book.bookID} book={book} />;
      })}
    </main>
  );
};

export default ReadBooksPage;
