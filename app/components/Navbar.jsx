"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const [welcome, setWelcome] = useState("");
  let router = useRouter();

  const logOut = () => {
    signOut(auth);
    setUser(null);
    router.push("/");
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  const helloUser = (user) => {
    if (user) {
      setWelcome(user.displayName);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      helloUser(currentUser);
    });
  }, []);

  if (user) {
    return (
      <nav className="p-4 relative border-b-2 lg:flex lg:justify-between lg:items-center">
        <div className="text-slate-100 font-black text-3xl">
          <Link href="/" onClick={() => setShowNavbar(false)}>
            Books-Buzz
          </Link>
        </div>

        <ul
          className={` ${
            showNavbar ? "active" : ""
          } hidden lg:flex lg:flex-row lg:justify-center lg:items-center  font-bold p-0`}
        >
          <p className="hidden lg:flex justify-center items-center mr-2">Hello {welcome}</p>
          <Link
            className="hover:bg-slate-800 p-2 lg:hover:rounded-md w-full text-center "
            href="/profile"
          >
            Profile
          </Link>
          <Link
            className="hover:bg-slate-800 lg:hover:rounded-md p-2 w-full text-center "
            href="/favourites"
            onClick={toggleNavbar}
          >
            Favourites
          </Link>
          <Link
            className="hover:bg-slate-800 lg:hover:rounded-md p-2  w-full text-center "
            href="/saved-for-later"
          >
            Saved
          </Link>
          <Link
            className="hover:bg-slate-800 lg:hover:rounded-md p-2  w-full text-center flex justify-center items-center"
            href="/currently-reading"
          >
            Reading
          </Link>

          <Link
            className="hover:bg-slate-800 lg:hover:rounded-md p-2  w-full text-center"
            href="/"
            onClick={logOut}
          >
           Sign out
          </Link>
        </ul>

        <Link
          className="absolute flex lg:hidden right-4 top-4 bg-slate-800 p-2 rounded"
          href="#"
        >
          <FaBars onClick={toggleNavbar} />
        </Link>
      </nav>
    );
  }
};

export default Navbar;
