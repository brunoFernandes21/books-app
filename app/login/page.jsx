"use client";
import { useState, useEffect } from "react";
import { app } from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);

const LoginPage = () => {
  const { user, setUser } = useContext(AuthContext);

  let router = useRouter();
  const [isError, setIsError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
  }, []);

  const handleChange = (event) => {
    setLoginData((previousData) => {
      const { name, value } = event.target;

      return { ...previousData, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(null);
    try {
      const responseFromLogin = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      const userID = responseFromLogin.user.reloadUserInfo.localId;

      const docRef = doc(db, "userData", userID);
      const responseWithSingleUser = await getDoc(docRef);

      if (!responseWithSingleUser.exists()) {
        console.error("Unable to get user details for " + userID);
        return;
      }
      const singleUserData = responseWithSingleUser.data();
      router.push("/");
    } catch (error) {
      setIsError("Incorrect user details, please try again.");
    }
  };

  return (
    <div className="landing__page max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      {user && router.push("/")}
      {!user && (
      <form
        onSubmit={handleSubmit}
        className="border px-6 py-8 rounded shadow-md text-white w-full"
      >
        <h1 className="mb-6 text-3xl text-center">Login</h1>
        {isError && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" text-center'>
            <span className="font-bold">{isError}</span>
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded-full mb-4 text-black"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="block border border-grey-light w-full text-black p-3 rounded-full mb-4"
          name="password"
          value={loginData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="bg-blue-800 hover:bg-blue-400 font-black w-full text-center py-3 rounded-full text-white my-1">
          Click here to login
        </button>
        <div className="flex justify-center items-center gap-2 no-underline mt-3 text-center ">
          <p>Do not have an account?</p>
          <Link href="/register">
            <span className="font-black border-b  hover:text-blue-800 hover:border-b-blue-800">
              Register here
            </span>
          </Link>
        </div>
      </form>

      )}
    </div>
  );
};

export default LoginPage;
