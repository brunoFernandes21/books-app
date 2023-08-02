"use client"
import React, { useContext, useState, useEffect } from 'react'
import app from '../firebase/config'
import { db } from '../firebase/config'
import { collection, getDocs } from "firebase/firestore";
import { UserContext } from '../context/User';

function Profile() {
  const [userData, setUserData] = useState([])
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState({})
  
  console.log("User Data from state", userData)

  // const findUser = () => {
  //   // console.log(userData)
  //   const filteredUser = userData.filter((userObject)=> {
  //     return userObject.user.userID === user
  //   })
  //   // console.log("Filtered User", filteredUser[0].user)
  //   setLoggedInUser(filteredUser[0].user)
  // }
  
  const getUserData = async () => {
    try {
        const response = await getDocs(collection(db, "userData"));
        response.forEach((doc) => {
            setUserData((currentData) => {
                return [
                    ...currentData,
                    {
                        user: doc.data(),
                    },
                ];
                
            });
        });
        setIsLoading(false)
        const filteredUser = userData.filter((userObject)=> {
          return userObject.user.userID === user
        })
        // console.log("Filtered User", filteredUser[0].user)
        setLoggedInUser(filteredUser[0].user)
    } catch (error) {
        console.log(error);
}
};

  useEffect(()=> {
    setIsLoading(true)
    getUserData()
  }, [])
  

if (isLoading) {
  return <p> User Data Loading... </p>
} else {
  return (
    <div>
      <p>You are successfully logged in</p>
      <p>Current user: {localStorage.getItem("user")}</p>
      <p>User from context: {user}</p>
      <p>Welcome {loggedInUser.fullName} !</p>
    </div>

  )
}

}

export default Profile








