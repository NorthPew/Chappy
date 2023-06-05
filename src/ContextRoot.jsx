import { createContext, useContext, useState } from "react";

export const UserContext = createContext()

const ContextRoot = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}} >
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot