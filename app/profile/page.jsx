"use client";
import React, { useContext } from "react";

import { UserContext } from "../context/User";

function Profile() {
    const { user, setUser } = useContext(UserContext);

    // console.log("user from CONTEXT: ", user);

    return (
        <div className="profile-page">
            <h2 className="profile-welcome">Welcome, {user.fullName}!</h2>
        </div>
    );
}

export default Profile;
