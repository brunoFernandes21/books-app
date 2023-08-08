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

const MarkedAsReadShelf = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const getUsersRead = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    try {
      const responseWithSingleUser = await getDoc(docRef);
      const singleUserData = responseWithSingleUser.data();
      setBooks(singleUserData.readBooks);
    } catch (error) {
      console.log(error);
    }
  }
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        
        if(!user) {
          router.push('/login')
        }else {
          console.log("user logged in")
          setUser(user);
         getUsersRead(user)
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
        <Link className="text-xl font-bold" href="/mark-as-read" >Marked As Read</Link>
        <div className="flex flex-row flex-wrap w-full gap-2 justify-start items-center">
          {books.map((book) => {
            return (
              <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
            );
          })}
        </div>
      </section>
    );
}



export default MarkedAsReadShelf;
