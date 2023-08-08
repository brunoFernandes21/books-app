"use client"
// Context API is a way to share data with 
// components at any level of the React component tree 
// without having to pass it down as props. Since a user might be 
// required by a different component in the tree, using the 
// Context API is great for managing the user state.
import {useState, createContext, useEffect} from 'react'

export const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)
  return (
    <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  )
}
