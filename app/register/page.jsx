"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/config";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
        setError(null)
        const email = formData.email;
        const password = formData.password;
        setLoading(true)
        if (formData.password === formData.confirmPassword) {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const user = response.user
                const userID = response.user.reloadUserInfo.localId;
                sendData(userID);
                updateProfile(auth.currentUser, {
                    displayName: formData.fullName
                }).then(() => {
                    console.log("Profile updated", displayName)
                }).catch((error) => {
                    setError("Incorrect details")
                })
                router.push("/login");                
            } catch (error) {
                setError("Incorrect details")
            }
            setLoading(false)
        }   else {
            setError("Passwords do not match")

        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form-title">Please register below.</h2>
                <div className="input-wrapper">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        placeholder="Enter your full name..."
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter a valid email..."
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        placeholder="Enter a valid password..."
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-wrapper">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        placeholder="Please confirm your password"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="bg-blue-500 p-2 rounded text-white">Register</button>
                {error ? <p>{error}</p> : null}
            </form>
            
        </div>
    );
};

export default RegisterPage;
