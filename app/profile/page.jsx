"use client";
import {useContext} from 'react'
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
  let router = useRouter();
  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
     })
   }, [])

    if(user) {
      return (
        <main className='mt-10 text-center'>
          <h1 className='font-bold text-lg'>Welcome back {user.displayName} </h1>
          <div className='mt-5'>
            <button className='bg-white p-3 rounded' >Update your details</button>
          </div>
          <section className='mt-5'>
            <h2 className='font-bold'>Currently Reading</h2>
            <CurrentlyReadingShelf/>
          </section>
          <section className='mt-5'>
            <h2 className='font-bold'>Saved For Later</h2>
            <SavedForLaterShelf/>
          </section>
          <section className='mt-5'>
            <h2 className='font-bold'>Favourites</h2>
            <FavouritesShelf/>
          </section>
          <section className='mt-5'>
            <h2 className='font-bold'>Marked As Read</h2>
            <MarkedAsReadShelf/>
          </section>
        </main>
      );
    }else {
      return (
        <LandingPage />
      )
    }
  
}

export default Profile;
