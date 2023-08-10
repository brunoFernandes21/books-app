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
  const { user, setUser} = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);
  const[ loading , setLoading ]= useState(true);

  const   getUsersSaved = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    const responseWithSingleUser = await getDoc(docRef);
    const singleUserData = responseWithSingleUser.data();
    setBooks(singleUserData.savedBooks)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) {
        router.push('/landing-page')
      }else {
        setUser(currentUser);
        getUsersSaved(currentUser)
      }
    });
  }, []);

  useEffect(()=>{
    setLoading(false)
  },[])

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
    <div>
      {loading &&( <p className="text-2xl font-bold text-center mt-96">Loading...</p> )} 
      {!loading && user && (
        <section className="p-4 bg-white mt-5 rounded-2xl text-slate-800 text-center">
        <h3 className="text-xl" >Saved For Later</h3>
        <div className="flex flex-row flex-wrap w-full gap-2 justify-center items-center">
          {books.map((book) => {
            return (
              <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
            );
          })}
        </div>
      </section>
      )}
    </div>
  );
};

export default SavedBooksPage;
