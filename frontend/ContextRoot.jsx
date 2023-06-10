import { createContext, useState, useEffect } from "react";
import authorize from "./data/authorize";

export const UserContext = createContext()

const sessionStorageKey = 'jwt-session'

const ContextRoot = ({children}) => {
    
    // If logged in
    useEffect(() => {
        if(sessionStorage.getItem(sessionStorageKey)) {

            let check = authorize(sessionStorage.getItem(sessionStorageKey))

            if (check.tokenMessage = "Du är autentiserad") {

                setIsLoggedIn(true)

                return
            }
        }
    })

    // User Login
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // User on group page or friends page
    const [isOnGroup, setIsOnGroup] = useState(false)

    const [messageNavigate, setMessageNavigate] = useState("")

    return (
        <UserContext.Provider value={{sessionStorageKey, messageNavigate, setMessageNavigate, isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot