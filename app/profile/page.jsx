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
  const router = useRouter();
  const {user, setUser} = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        router.push("/")
      }
     })
   }, [])

    if(user) {
      return (
        <main className='mt-10 text-center'>
          {/* <h1 className='font-bold text-lg'>Welcome back {user.displayName} </h1> */}
          {/* <div className='mt-5'>
            <button className='bg-white p-3 rounded' >Update your details</button>
          </div> */}
          <section className='mt-5'>
            <CurrentlyReadingShelf/>
          </section>
          <section className='mt-5'>
            <SavedForLaterShelf/>
          </section>
          <section className='mt-5'>
            <FavouritesShelf/>
          </section>
          <section className='mt-5'>
            <MarkedAsReadShelf/>
          </section>
        </main>
      );
    } else {
      return (
        <LandingPage />
      )
    }
  
}

export default Profile;
