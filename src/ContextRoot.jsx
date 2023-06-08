import { createContext, useState } from "react";

export const UserContext = createContext()

const ContextRoot = ({children}) => {

    // User Login
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // User on group page or friends page
    const [isOnGroup, setIsOnGroup] = useState(false)

    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isOnGroup, setIsOnGroup}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot