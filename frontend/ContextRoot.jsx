import { createContext, useState, useEffect } from "react";
import authorize from "./data/authorize";

export const UserContext = createContext()

const sessionStorageKey = 'jwt-session'

const localStorageUserKey = 'user-session'

const ContextRoot = ({children}) => {
    
    // If logged in
    useEffect(() => {
        if(sessionStorage.getItem(sessionStorageKey)) {

            let check = authorize(sessionStorage.getItem(sessionStorageKey))

            if (check.tokenMessage = "Du är autentiserad") {

                setIsLoggedIn(true)

                let userKey = JSON.parse(localStorage.getItem(localStorageUserKey))

                setSaveUserName(userKey.username)
                setSaveUserId(userKey.id)

                return
            }
        } else {
            localStorage.removeItem(localStorageUserKey)
        }
    })

    // User Login
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [saveUserName, setSaveUserName] = useState("")
    const [saveUserId, setSaveUserId] = useState("")

    // User on group page or friends page
    const [isOnGroup, setIsOnGroup] = useState(false)

    // To capture where user is at, route: group (Chappy) or DM, channel: group channel or specific user chat
    const [selectSpecificView, setSelectSpecificView] = useState({})

    return (
        <UserContext.Provider value={{sessionStorageKey, localStorageUserKey, saveUserName, setSaveUserName, saveUserId, setSaveUserId, selectSpecificView, setSelectSpecificView, isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot