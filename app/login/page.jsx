"use client";
import { useState } from "react";
import app from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setLoginData((previousData) => {
            const { name, value } = event.target;

            return { ...previousData, [name]: value };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

            console.log(response);
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                value={loginData.email}
                placeholder="Enter a valid email..."
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                placeholder="Enter a valid password..."
                onChange={handleChange}
                required
            />

            <button className="bg-blue-500 p-2 rounded text-white">Log In</button>
        </form>
    );
};

export default LoginPage;
