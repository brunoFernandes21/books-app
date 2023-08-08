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
                // console.log("FAVOURITES", singleUserFavourites);
                singleUserFavourites.forEach((favouriteBook) => {
                    if (!uniqueBooksSet.has(favouriteBook.bookID)) {
                        uniqueBooksSet.add(favouriteBook.bookID);
                        uniqueFavourites.push(favouriteBook);
                    }
                });
            });
            setFavouritesData(uniqueFavourites);
            // console.log(uniqueFavourites, "uniqueFavourites");
            // console.log(uniqueBooksSet, "uniqueBooksSet");
        }
    };
    useEffect(() => {
        getAllUsersData()
    }, [])
    useEffect(() => {
        getAllFavourites()
    }, [allUsersData])
    // return (

    //     <div>
    //         <p>Other Users Favourite Books</p>
    //         {favouritesData.length !== 0 ? (
    //             favouritesData.map((favouriteBook) => {
    //                 return (
    //                     <div key={favouriteBook.bookID}>
    //                         <p>{favouriteBook.bookInfo.title}</p>
    //                     </div>
    //                 );
    //             })
    //         ) : (
    //             <p>No favourites to show</p>
    //         )}
    //     </div>

    // )
    return (
        <div className="book-title flex justify-center flex-col items-center p-2">
            <h3>Users Favourites</h3>
            <div className="flex w-full justify-between flex-row gap-4 ">
               {favouritesData.length !== 0 ? (favouritesData.map((favouriteBook) => {
                    console.log(favouriteBook)
                    return (
                        <div key={favouriteBook.bookID}>
                            <p>{favouriteBook.bookInfo.title}</p>
                        </div>
                    )
                })) : (<p> No Favourites to show</p>)} 
            </div>
        </div>
    );
}

export default AllUsersFavourites