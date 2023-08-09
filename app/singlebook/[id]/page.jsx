"use client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import Link from "next/link";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import { fetchBookById } from "@/app/api/route";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

function SingleBookPage() {
  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buttonError, setButtonError] = useState(null);
  const [dupplicateMessage, setDupplicateMessage] = useState(null);
  const [bookAdded, setBookAdded] = useState(null);
  const { id } = useParams();
  let router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    setError(false);
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const getBookById = async () => {
      try {
        const data = await fetchBookById(id);
        setSingleBook(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    getBookById();
  }, []);

  const addToFavourites = async () => {
    const docRef = doc(db, "userData", user.uid);

    try {
      setButtonError(null);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isDupplicate = userData.favourites.some(
        (favouriteBook) => favouriteBook.bookID === id
      );
      if (!isDupplicate) {
        setDupplicateMessage(null);
        const updateAction = await updateDoc(docRef, {
          favourites: arrayUnion({ bookID: id, bookInfo: singleBook }),
        });
        setBookAdded("Book successfully added to your Favourites");
      } else {
        setDupplicateMessage("Book already in your Favourites");
      }
    } catch (error) {
      setButtonError("Unable to add to Favourites");
      setDupplicateMessage(null);
    }
  };

  const addToCurrentlyReading = async () => {
    const docRef = doc(db, "userData", user.uid);
    try {
      setButtonError(null);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isDupplicate = userData.currentlyReading.some(
        (currentlyReadingBook) => currentlyReadingBook.bookID === id
      );
      if (!isDupplicate) {
        setDupplicateMessage(null);
        const updateAction = await updateDoc(docRef, {
          currentlyReading: arrayUnion({ bookID: id, bookInfo: singleBook }),
        });
        setBookAdded("Book successfully added to your Currently Reading");
      } else {
        setDupplicateMessage("Book already in your Currently Reading");
      }
    } catch (error) {
      setButtonError("Unable to add to Currently Reading");
      setDupplicateMessage(null);
    }
  };

  const saveForLater = async () => {
    const docRef = doc(db, "userData", user.uid);
    try {
      setButtonError(null);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isDupplicate = userData.savedBooks.some(
        (savedBook) => savedBook.bookID === id
      );
      if (!isDupplicate) {
        setDupplicateMessage(null);
        const updateAction = await updateDoc(docRef, {
          savedBooks: arrayUnion({ bookID: id, bookInfo: singleBook }),
        });
        setBookAdded("Book successfully added to your Save For Later");
      } else {
        setDupplicateMessage("Book already in your Save For Later");
      }
    } catch (error) {
      setButtonError("Unable to add to Save For Later");
      setDupplicateMessage(null);
    }
  };

  const markAsRead = async () => {
    const docRef = doc(db, "userData", user.uid);
    try {
      setButtonError(null);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const isDupplicate = userData.readBooks.some(
        (readBook) => readBook.bookID === id
      );
      if (!isDupplicate) {
        setDupplicateMessage(null);
        const updateAction = await updateDoc(docRef, {
          readBooks: arrayUnion({ bookID: id, bookInfo: singleBook }),
        });
        setBookAdded("Book successfully added to your Mark As Read");
      } else {
        setDupplicateMessage("Book already in your Mark As Read");
      }
    } catch (error) {
      setButtonError("Unable to add to Mark As Read");
      setDupplicateMessage(null);
    }
  };

  const clearHTMLTags = (strToSanitize) => {
    if (strToSanitize) {
      return strToSanitize.replace(/(<([^>]+)>)/gi, ``);
    } else {
      return "No description available";
    }
  };

  return (
    <main>
      {error && (
        <p className="text-2xl font-bold text-center mt-96">No books found</p>
      )}
      {loading && !error && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}
      {!loading && (
        <article className="mt-10 flex justify-center items-center m-auto bg-white rounded-2xl">
          <div className="m-auto p-4 ">
            <div className="flex justify-center">
              {singleBook.imageLinks.thumbnail ? (
                <img
                  src={singleBook.imageLinks.thumbnail}
                  alt={`${singleBook.title}`}
                  className="rounded"
                />
              ) : (
                <img
                  className="rounded"
                  src="https://img.freepik.com/free-vector/open-blue-book-white_1308-69339.jpg?w=826&t=st=1[…]4e6e1b459442a3a22f4ff98073ddebe88a1700930b1c10a1b41660b511b70"
                />
              )}
            </div>
            <div className="single-book-info text-slate-800 mt-4">
              <h3 className="text-center text-xl">{singleBook.title}</h3>
              <p className="text-center text-lg">by {singleBook.authors}</p>
              <p className="text-center">
                Published {singleBook.publishedDate}
              </p>
              <p className="mt-2">{clearHTMLTags(singleBook.description)}</p>
              {buttonError !== null && (
                <div className='bg-red-100 border my-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" text-center'>
                  <span className="font-bold">{buttonError}</span>
                </div>
              )}
              {dupplicateMessage !== null && (
                <div className='bg-red-100 w-1/2 m-auto border my-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" text-center'>
                  <span className="font-bold">{dupplicateMessage}</span>
                </div>
              )}
              {dupplicateMessage === null && bookAdded !== null && (
                <div className='bg-green-100 w-1/2 m-auto border my-4 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert" text-center'>
                  <span className="font-bold">{bookAdded}</span>
                </div>
              )}
              <div className="w-4/5 m-auto p-4">
                <button
                  className="mb-2 w-full md:w-1/2 bg-blue-800 hover:bg-blue-400 font-black text-center py-3 rounded-full text-white my-1"
                  onClick={addToFavourites}
                >
                  Add to Favourites
                </button>
                <button
                  className="mb-2 w-full md:w-1/2 bg-blue-800 hover:bg-blue-400 font-black text-center py-3 rounded-full text-white my-1"
                  onClick={addToCurrentlyReading}
                >
                  Add to Currently Reading
                </button>
                <button
                  className="mb-2 w-full md:w-1/2 bg-blue-800 hover:bg-blue-400 font-black text-center py-3 rounded-full text-white my-1"
                  onClick={saveForLater}
                >
                  Save for Later
                </button>
                <button
                  className="mb-2 w-full md:w-1/2 bg-blue-800 hover:bg-blue-400 font-black text-center py-3 rounded-full text-white my-1"
                  onClick={markAsRead}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}

export default SingleBookPage;
