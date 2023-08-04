"use client";
import {useContext} from 'react'
import {AuthContext} from "@/app/context/AuthContext"
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "@/app/firebase/config"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

function Profile() {
  let router = useRouter();
  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
     })
   }, [])

    if(user) {
      return (
        <p>Hello {user.displayName} </p>
        //ADD FOR WITH USER EMAIL/NAME/PASSWORD AND TBN
      );
    }else {
      router.push("/");
    }
  
}

export default Profile;
