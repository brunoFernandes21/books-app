"use client";
import { useState } from "react";
import app from "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const auth = getAuth(app);

const LoginPage = () => {
    let router = useRouter();
    const [isError, setIsError] = useState(null);
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
        setIsError(null);
        try {
            const response = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
            console.log(response);
            router.push("/");
        } catch (error) {
            setIsError(error.message);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Please log in below.</h2>

                <div className="input-wrapper">
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
                </div>

                <div className="input-wrapper">
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
                </div>

                <button className="bg-blue-500 p-2 rounded text-white">Log In</button>

                {isError ? <p>{isError}</p> : null}
            </form>
        </div>
    );
};

export default LoginPage;
