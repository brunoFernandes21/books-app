"use client";
import { useState } from "react";
import app from "../firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const auth = getAuth(app);

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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
            const response = await addDoc(collection(db, "userData"), {
                userID: userID,
                fullName: formData.fullName,
                favourites: [],
                savedBooks: [],
                readBooks: [],
                currentlyReading: []
            });
            console.log("Response from send data function >>", response);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = formData.email;
        const password = formData.password;
        if (formData.password === formData.confirmPassword) {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                console.log("user ID >>", response.user.reloadUserInfo.localId)
                const userID = response.user.reloadUserInfo.localId
                sendData(userID);
                router.push("/");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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

            <button className="bg-blue-500 p-2 rounded text-white">Register</button>
        </form>
    );
};

export default RegisterPage;
