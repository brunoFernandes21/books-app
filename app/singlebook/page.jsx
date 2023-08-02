"use client"
import { useEffect, useState, useContext } from 'react'
import React from 'react'
import axios from 'axios'
import { UserContext } from '../context/User'
import Link from 'next/link'
import { doc, updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/config"

function SingleBookPage() {

    const [singleBook, setSingleBook] = useState({})
    const [loading, setLoading] = useState(true)
    const {user, setUser} = useContext(UserContext)

    const sampleBookID = "RJxWIQOvoZUC"

    const getBookById = (sampleBookID) => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${sampleBookID}`)
           .then((response) => {
            return response.data.volumeInfo;
            })
        }

    useEffect(() => {
            setLoading(true)
            getBookById(sampleBookID)
            .then(
                (bookInfo) => {
                    console.log("insideUseEffect >>", bookInfo)
                    setSingleBook(bookInfo)
                }
            )
            .then(() => {
                setLoading(false)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

   const addToFavourites = async () => {
    const favouritesRef = await db.collection("userData").doc("cI9UPmPHhExpXzgaAgEM")
        .update({
            favorites: [sampleBookID]
    // console.log(favouritesRef)
   })
}

 if (loading) {
    return <p>Loading...</p>
 } else {
    return (
    <article className="single-book-page">
        <p>Currently logged in as {user}</p>
        <div className="single-book-container">
            <img src={singleBook.imageLinks?.small}/>
            <div className="single-book-info">
            <h3>{singleBook.title}</h3>
            <p>Author: {singleBook.authors}</p>
            <p>Description: {singleBook.description}</p>
            <p>Published {singleBook.publishedDate}</p>
            <div>
                <button onClick={addToFavourites}>Add to Favourites</button>
                <button>Add to Current Reads</button>
                <button>Save for Later</button>
                <button>Mark as Read</button>
            </div>
            <Link href="/profile" className="bg-blue-500 p-2 rounded text-white"> Profile</Link>
            </div>
        </div>
    </ article>
  )
}

}

export default SingleBookPage