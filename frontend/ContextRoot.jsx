import { createContext, useState, useEffect } from "react";
import authorize from "./data/authorize";
import { getMessages } from "./data/getMessages";
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


    // To refresh message board when sending a message and so on
    async function refreshMsgs(route, channel) {
        const data = await getMessages(route, channel);
        setMessageData(data);
    }


    // User Login
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [saveUserName, setSaveUserName] = useState("")
    const [saveUserId, setSaveUserId] = useState("")


    // Group/DM and Channel/User ID
    const [saveGroupName, setSaveGroupName] = useState("")
    const [saveChannelId, setSaveChannelId] = useState("")

    // Messages
    const [messageData, setMessageData] = useState(null);

    // User on group page or start page
    const [isOnGroup, setIsOnGroup] = useState(false)

    // To capture where user is at, route: group (Chappy) or DM, channel: group channel or specific user chat
    const [selectSpecificView, setSelectSpecificView] = useState({})

    return (
        <UserContext.Provider value={{sessionStorageKey, localStorageUserKey, saveUserName, setSaveUserName, saveUserId, setSaveUserId, selectSpecificView, setSelectSpecificView, isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup, saveGroupName, setSaveGroupName, saveChannelId, setSaveChannelId, messageData, setMessageData, refreshMsgs}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot