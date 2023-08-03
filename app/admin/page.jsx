'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {useContext} from 'react'

function Page() {
    const { user } = useContext(useAuthContext())
    const router = useRouter()
    React.useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;