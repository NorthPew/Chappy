import { createContext, useState, useEffect } from "react";

export const UserContext = createContext()

const sessionStorageKey = 'jwt-session'

const ContextRoot = ({children}) => {
    
    // If logged in
    useEffect(() => {
        if(sessionStorage.getItem(sessionStorageKey)) {
            setIsLoggedIn(true)
        }
    })

    // User Login
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // User on group page or friends page
    const [isOnGroup, setIsOnGroup] = useState(false)

    return (
        <UserContext.Provider value={{sessionStorageKey, isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot