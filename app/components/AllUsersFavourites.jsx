"use client"
import { getDocs , collection} from 'firebase/firestore'
import {db} from "../firebase/config"
import React, { useEffect, useState } from 'react'


function AllUsersFavourites() {
    const[allUsersData , setAllUsersData]= useState([])
    const[favouritesData, setFavouritesData]= useState([])
    const getAllUsersData = async () => {
        const docRef = collection(db,'userData')
        const response = await getDocs(docRef)
        // console.log(response)
        response.forEach(doc =>{
            // console.log(doc.data())
            setAllUsersData((currentUserData)=>{
                return [...currentUserData, doc.data()]

            })
        })
    }
    const getAllFavourites = ()=>{
       
    }
    useEffect(()=>{
        getAllUsersData()
    },[])
    console.log(allUsersData, "alluserdata")
  return (

    <div>
  <p>users data</p>
    </div>
  )
}

export default AllUsersFavourites