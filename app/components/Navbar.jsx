"use client"
import Link from "next/link"
import {useContext} from 'react'
import {AuthContext} from "@/app/context/AuthContext"
import { signOut} from 'firebase/auth'
import { useRouter } from "next/navigation";
import {auth} from "@/app/firebase/config"
const Navbar = () => {
  const {user} = useContext(AuthContext)
  let router = useRouter()
  const logOut = () => {
    signOut(auth);
    router.push("/login");
    console.log('User signed out')
  }
  if(user) {
    return (
      <nav className="border border-blue-700 p-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Books-Buzz</Link>
        <div className="gap-4 hidden md:flex ">
          <p>Hello {user.displayName}</p>
          <Link href="/#">Favourites</Link>
          <Link href="/#">Saved</Link>
          <Link href="/#">Currently Reading</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login" onClick={logOut}>Sign out</Link>
        </div>
      </nav>
    )
  }
}

export default Navbar