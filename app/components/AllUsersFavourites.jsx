"use client"
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase/config"
import React, { useEffect, useState } from 'react'
import { DBBookCard } from './DBBookCard'
import Link from "next/link";



function AllUsersFavourites() {
    const [allUsersData, setAllUsersData] = useState([])
    const [favouritesData, setFavouritesData] = useState([])
    const getAllUsersData = async () => {
        try {
            const docRef = collection(db, 'userData')
            const response = await getDocs(docRef)
            response.forEach(doc => {
                setAllUsersData((currentUserData) => {
                    return [...currentUserData, doc.data()]

                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getAllFavourites = () => {
        if (allUsersData.length !== 0) {
            const uniqueFavourites = [];
            const uniqueBooksSet = new Set();
            allUsersData.forEach((singleUser) => {
                const singleUserFavourites = singleUser.favourites;
                singleUserFavourites.forEach((favouriteBook) => {
                    if (!uniqueBooksSet.has(favouriteBook.bookID)) {
                        uniqueBooksSet.add(favouriteBook.bookID);
                        uniqueFavourites.push(favouriteBook);
                    }
                });
            });
            setFavouritesData(uniqueFavourites);
        }
    };
    useEffect(() => {
        getAllUsersData()
    }, [])
    useEffect(() => {
        getAllFavourites()
    }, [allUsersData])

    return (
        <div className="book-title  mt-10 flex justify-center flex-col items-center pt-4 p-2 bg-white text-slate-800 rounded-2xl">
            <h3 className='text-2xl'>Users Favourites</h3>
            <div className="flex justify-start flex-row gap-4 p-4 overflow-x-scroll w-full">
               {favouritesData.length !== 0 ? (favouritesData.map((favouriteBook) => {
                    return (
                        <Link className='bookCard min-w-max'  href={`http://localhost:3000/singlebook/${favouriteBook.bookID}`} key={favouriteBook.bookID} >
                            <img  src={favouriteBook.bookInfo.imageLinks.smallThumbnail ?favouriteBook.bookInfo.imageLinks.smallThumbnail : "https://img.freepik.com/free-vector/open-blue-book-white_1308-69339.jpg?w=826&t=st=1[…]4e6e1b459442a3a22f4ff98073ddebe88a1700930b1c10a1b41660b511b70" } alt={`${favouriteBook.bookInfo.title}`} /> 
                        </Link>
                    )
                })) : (<p> No Favourites to show</p>)} 
            </div>
        </div>
    );
}

export default AllUsersFavourites