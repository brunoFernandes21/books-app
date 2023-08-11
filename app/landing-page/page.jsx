"use client"
import Image from "next/image";
import landingPageImage from "../../public/images/landing-page-logo.png";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
const LandingPage = () => {
  const { user, setUser } = useContext(AuthContext);
  let router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    });
  }, []);
  

    return (
      <main className="landing__page ">
        {user && router.push("/")}
       {!user && (
        <section className="rounded-2xl border-4 border-white text-white  flex justify-center items-center flex-col p-4 m-auto">
        <h1 className="uppercase font-black text-4xl mb-4 text-center">
          Welcome to Books-Buzz
        </h1>
        <div>
          <Image
          className="hover:scale-110 transition-all ease-in"
            src={landingPageImage}
            width={250}
            height={250}
            alt="a stack of books"
          />
        </div>
        <p className="text-center text-lg font-black mt-5">
          Keep track of current reads, find new favourites and connect with
          friends.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/login"
            className="bg-blue-800 p-2 font-bold rounded text-white px-6 hover:bg-blue-400"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-800 p-2 font-bold rounded text-white hover:bg-blue-400"
          >
            Register
          </Link>
        </div>
      </section>
       )}
      </main>
    );
  

};

export default LandingPage;
