"use client";
import { useEffect, useState, useContext } from "react";
import React from "react";
import Link from "next/link";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
    const[error , setError]= useState(false);
    const { id } = useParams();
    let router = useRouter();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        setError(false)
        onAuthStateChanged(auth, (user) => {
            setUser(user);
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
                setError(true)
                console.log(error);
            }
        };
        getBookById();
    }, []);

    const addToFavourites = async () => {
        const docRef = doc(db, "userData", user.uid);
        const updateAction = await updateDoc(docRef, {
            favourites: arrayUnion(
                {bookID: id,
                bookInfo: singleBook}
                )
        })
    };

    const addToCurrentlyReading = async () => {
        const docRef = doc(db, "userData", user.uid);
        const updateAction = await updateDoc(docRef, {
            currentlyReading: arrayUnion(                
                {bookID: id,
                bookInfo: singleBook}),
        });
    };

    const saveForLater = async () => {
        const docRef = doc(db, "userData", user.uid);
        const updateAction = await updateDoc(docRef, {
            savedBooks: arrayUnion(                
                {bookID: id,
                bookInfo: singleBook}),
        });
    };

    const markAsRead = async () => {
        const docRef = doc(db, "userData", user.uid);
        const updateAction = await updateDoc(docRef, {
            readBooks: arrayUnion(               
                {bookID: id,
                bookInfo: singleBook}),
        }); 
    };

    const clearHTMLTags = (strToSanitize) => {
        if(strToSanitize){
            return(strToSanitize.replace(/(<([^>]+)>)/gi, ``));
        }
        else{
            return "No description available"
        }
      }

    

    if(!error){
        if (loading) {
            return <p>Loading...</p>;
        } else {
            if (user) {
                return (
                    <article className="single-book-page">
                        <div className="single-book-container">
                            <img className="book-img" src={singleBook.imageLinks.small} alt="book cover" />
    
                            <div className="single-book-info">
                                <h3>{singleBook.title}</h3>
                                <p>Author: {singleBook.authors}</p>
                                <p>Description: {clearHTMLTags(singleBook.description)}</p>
                                <p>Published: {singleBook.publishedDate}</p>
    
                                <div className="button-container">
                                    <button onClick={addToFavourites}>Add to Favourites</button>
                                    <button onClick={addToCurrentlyReading}>Add to Currently Reading</button>
                                    <button onClick={saveForLater}>Save for Later</button>
                                    <button onClick={markAsRead}>Mark as Read</button>
                                </div>
    
                                <Link href="/profile" className="bg-blue-500 p-2 rounded text-white">
                                    Go to Profile Page
                                </Link>
                            </div>
                        </div>
                    </article>
                );
            } else {
                router.push("/");
            }
        }
    }
    else{
        return (
        <p>No book found</p>
        )
    }
   
}

export default SingleBookPage;
