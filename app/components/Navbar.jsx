"use client"

import Link from "next/link"
import {useContext} from 'react'
import {AuthContext} from "@/app/context/AuthContext"
import { signOut} from 'firebase/auth'
import { useRouter } from "next/navigation";
import {auth} from "@/app/firebase/config"
import { useState, useEffect } from "react"
import {FaBars} from "react-icons/fa"
import { onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {
  const {user, setUser} = useContext(AuthContext)
  let router = useRouter()
  const [welcome, setWelcome] = useState("")
  
  const logOut = () => {
    signOut(auth);
    router.push("/login");
    console.log('User signed out')
  }
  const [showNavbar, setShowNavbar] = useState(false)
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const helloUser = (user) => {
    if(user) {
      setWelcome(user.displayName)
    }
   }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      helloUser(user)
     })
   }, [])

  
  
   if(user) {

  
  return (
      <nav className="p-4 relative border md:flex md:justify-between md:items-center">
  
      <div className="text-slate-800 font-black text-3xl">
      <Link href="/" onClick={toggleNavbar}>Books-Buzz</Link>
        </div>

      <ul className={` ${showNavbar ? "active" : ""} hidden md:flex md:flex-row justify-center items-center gap-4`}>
          <p>Hello {welcome}</p>
          <Link  href="/favourites" onClick={toggleNavbar}>Favourites</Link>
          <Link  href="/#">Saved</Link>
          <Link href="/#">Currently Reading</Link>
          <Link  href="/profile">Profile</Link>
          <Link href="/login" onClick={logOut}>Sign out</Link>
        </ul>

      <Link className="absolute flex md:hidden right-4 top-4 bg-white p-2 rounded" href="#">
        <FaBars onClick={toggleNavbar}/>
      </Link>
      </nav>
    )
  }
}

export default Navbar