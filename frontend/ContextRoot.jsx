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


    // If on a group and on a specific channel, display a different text on message field
    const [whereToSendMessageToView, setWhereToSendMessageToView] = useState("")

    // To capture where user is at, route: group or DM, channel: group channel or specific user
    const [selectSpecificView, setSelectSpecificView] = useState({})

    return (
        <UserContext.Provider value={{sessionStorageKey, whereToSendMessageToView, setWhereToSendMessageToView, selectSpecificView, setSelectSpecificView, isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot