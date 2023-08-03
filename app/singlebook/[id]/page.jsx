"use client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { UserContext } from "../../context/User";
import Link from "next/link";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import { fetchBookById } from "@/app/api/route";
function SingleBookPage() {
  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const getBookById = async () => {
      try {
        const data = await fetchBookById(id);
        setSingleBook(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    };
    getBookById();
  }, []);

  const addToFavourites = async () => {
    const docRef = doc(db, "userData", user.userID);
    const updateAction = await updateDoc(docRef, {
      favorites: [id],
    });
    console.log("Added to Favourites");
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <article className="single-book-page">
        <h3>Currently logged in as: {user.fullName}</h3>

        <div className="single-book-container">
          <img
            className="book-img"
            src={singleBook.imageLinks.smallThumbnail}
            alt="book cover"
          />

          <div className="single-book-info">
            <h3>{singleBook.title}</h3>
            <p>Author: {singleBook.authors}</p>
            <p>Description: {singleBook.description}</p>
            <p>Published: {singleBook.publishedDate}</p>

            <div className="button-container">
              <button onClick={addToFavourites}>Add to Favourites</button>
              <button>Add to Current Reads</button>
              <button>Save for Later</button>
              <button>Mark as Read</button>
            </div>

            <Link
              href="/profile"
              className="bg-blue-500 p-2 rounded text-white"
            >
              Go to Profile Page
            </Link>
          </div>
        </div>
      </article>
    );
  }
}

export default SingleBookPage;
