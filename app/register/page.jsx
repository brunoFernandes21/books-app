"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, getAuth} from "firebase/auth";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db, app } from "../firebase/config";
import Link from "next/link";

const auth = getAuth(app);

const RegisterPage = () => {
    
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const handleChange = (event) => {
    setFormData((previousFormData) => {
      const { name, value } = event.target;
      return {
        ...previousFormData,
        [name]: value,
      };
    });
  };

  let router = useRouter();

  const sendData = async (userID) => {
    try {
      const docRef = doc(db, "userData", userID);
      const response = await setDoc(docRef, {
        userID: userID,
        fullName: formData.fullName,
        favourites: [],
        savedBooks: [],
        readBooks: [],
        currentlyReading: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    setLoading(true);
    if (formData.password === formData.confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userID = response.user.reloadUserInfo.localId;
        sendData(userID);
        updateProfile(auth.currentUser, {
          displayName: formData.fullName,
        })
          .then(() => {
            console.log("Profile updated", displayName);
          })
          .catch((error) => {
            console.log(error);
          });
          
        router.push("/");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="landing__page max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form onSubmit={handleSubmit} className="border px-6 py-8 rounded shadow-md text-white w-full">
        <h1 className="mb-6 text-3xl text-center">Register</h1>
        {/* {error && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"'>
            <span className="font-bold">{error}</span>
          </div>
        )} */}
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className="block text-black border border-grey-light w-full p-3 rounded-full mb-4"
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="block text-black border border-grey-light w-full p-3 rounded-full mb-4"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="block text-black border border-grey-light w-full p-3 rounded-full mb-4"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="block text-black border border-grey-light w-full p-3 rounded-full mb-4"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button className="bg-blue-800 hover:bg-blue-400 font-black w-full text-center py-3 rounded-full text-white my-1">
          Click here to register
        </button>
        <div className="flex justify-center items-center gap-2 no-underline mt-3 text-center ">
          <p>Already have an account?</p>
          <Link href="/login">
            <span className="font-black border-b hover:text-blue-800 hover:border-b-blue-800">Login here</span>
          </Link>
        </div>
      </form>
    </div>
  );

  // return (
  //     <div className="form-container">
  //         <form className="form" onSubmit={handleSubmit}>
  //             <h2 className="form-title">Please register below.</h2>
  //             <div className="input-wrapper">
  //                 <label htmlFor="fullName">Full Name</label>
  //                 <input
  //                     type="text"
  //                     id="fullName"
  //                     name="fullName"
  //                     value={formData.fullName}
  //                     placeholder="Enter your full name..."
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             <div className="input-wrapper">
  //                 <label htmlFor="email">Email</label>
  //                 <input
  //                     type="text"
  //                     id="email"
  //                     name="email"
  //                     value={formData.email}
  //                     placeholder="Enter a valid email..."
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             <div className="input-wrapper">
  //                 <label htmlFor="password">Password</label>
  //                 <input
  //                     type="password"
  //                     id="password"
  //                     name="password"
  //                     value={formData.password}
  //                     placeholder="Enter a valid password..."
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             <div className="input-wrapper">
  //                 <label htmlFor="confirmPassword">Confirm Password</label>
  //                 <input
  //                     type="password"
  //                     id="confirmPassword"
  //                     name="confirmPassword"
  //                     value={formData.confirmPassword}
  //                     placeholder="Please confirm your password"
  //                     onChange={handleChange}
  //                     required
  //                 />
  //             </div>

  //             <button className="bg-blue-500 p-2 rounded text-white">Register</button>
  //         </form>
  //     </div>
  // );
};

export default RegisterPage;
