"use client";
import {useContext, useState} from 'react'
import {AuthContext} from "@/app/context/AuthContext"
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "@/app/firebase/config"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import CurrentlyReadingShelf from '../components/CurrentlyReadingShelf';
import LandingPage from "../components/LandingPage";
import SavedForLaterShelf from '../components/SavedForLaterShelf';
import FavouritesShelf from '../components/FavouritesShelf';
import MarkedAsReadShelf from '../components/MarkedAsReadShelf';

function Profile() {
  const router = useRouter();
  const {user, setUser} = useContext(AuthContext)
  const [loading , setLoading]= useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        router.push("/")
      }
     })
   }, [])
   useEffect(()=>{
    setLoading(false)
   },[])
      return (
        <div>
          {loading && (
        <p className="text-2xl font-bold text-center mt-96">Loading...</p>
      )}
          {!loading && user && ( <main className='mt-10 text-center'><h1 className='font-bold text-3xl md:text-4xl'>Welcome back, {user.displayName}!</h1>
          <section className='mt-5'>
            <FavouritesShelf/>
          </section>
          <section className='mt-5'>
            <CurrentlyReadingShelf/>
          </section>
          <section className='mt-5'>
            <SavedForLaterShelf/>
          </section>
          <section className='mt-5'>
            <MarkedAsReadShelf/>
          </section> </main> ) } 
          {!user && !loading && (<LandingPage />)}
      </div>
      );
  
}

export default Profile;
