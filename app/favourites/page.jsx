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

const FavouritesPage = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const   getUsersFavourites = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    const responseWithSingleUser = await getDoc(docRef);
    const singleUserData = responseWithSingleUser.data();
    console.log(singleUserData.favourites)
    setBooks(singleUserData.favourites)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      getUsersFavourites(user)
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

  const removeBook = async (id) => {
    // try and do with state 
    
    console.log("BOOK ID", id)
    const docRef = doc(db, "userData", user.uid);    
        const updateAction = await updateDoc(docRef, {
            favourites: arrayRemove({bookID: id})
        })
  }

  return (
    <main>
      <h1>These are your favourite books</h1>
      {books.map((book) => {
        return <DBBookCard key={book.bookID} book={book} removeBook={removeBook}/>;
      })}
    </main>
  );
};

export default FavouritesPage;
