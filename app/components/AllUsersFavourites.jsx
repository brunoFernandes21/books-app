"use client"
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../firebase/config"
import React, { useEffect, useState } from 'react'
import { DBBookCard } from './DBBookCard'



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
        <div className="book-title flex justify-center flex-col items-center p-2">
            <h3>Users Favourites</h3>
            <div className="flex w-full justify-between flex-row gap-4 ">
               {favouritesData.length !== 0 ? (favouritesData.map((favouriteBook) => {
                    return (
                        <div key={favouriteBook.bookID}>
                            <img src={favouriteBook.bookInfo.imageLinks.smallThumbnail ?favouriteBook.bookInfo.imageLinks.smallThumbnail : "https://img.freepik.com/free-vector/open-blue-book-white_1308-69339.jpg?w=826&t=st=1[…]4e6e1b459442a3a22f4ff98073ddebe88a1700930b1c10a1b41660b511b70" } alt={`${favouriteBook.bookInfo.title}`}/> 
                        </div>
                    )
                })) : (<p> No Favourites to show</p>)} 
            </div>
        </div>
    );
}

export default AllUsersFavourites