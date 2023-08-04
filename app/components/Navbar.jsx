"use client"

import Link from "next/link"
import {useContext} from 'react'
import {AuthContext} from "@/app/context/AuthContext"
import { signOut} from 'firebase/auth'
import { useRouter } from "next/navigation";
import {auth} from "@/app/firebase/config"
import { useState } from "react"
import {FaBars} from "react-icons/fa"

const Navbar = () => {
  const {user} = useContext(AuthContext)
  let router = useRouter()
  const logOut = () => {
    signOut(auth);
    router.push("/login");
    console.log('User signed out')
  }
  if(user) {
    const [showNavbar, setShowNavbar] = useState(false)
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
      <nav className="relative border md:flex md:justify-between md:items-center">
  
      <div className="ml-4 text-slate-800 font-black text-3xl">
      <Link href="/" >Books-Buzz</Link>
        </div>

      <ul className={`${showNavbar ? "active" : ""} hidden md:flex justify-center items-center gap-4`}>
          <p>Hello {user.displayName}</p>
          <Link href="/#">Favourites</Link>
          <Link href="/#">Saved</Link>
          <Link href="/#">Currently Reading</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login" onClick={logOut}>Sign out</Link>
        </ul>

      <Link className="absolute flex md:hidden right-4 top-2 bg-white p-2 rounded" href="#">
        <FaBars onClick={toggleNavbar}/>
      </Link>
      </nav>
    )
  }
}

export default Navbar