import { useContext, useEffect } from "react";
import { UserContext } from "../../ContextRoot";

function GroupChatTwoView () {
    const {selectSpecificView, setSelectSpecificView} = useContext(UserContext);
    
    useEffect(() => { setSelectSpecificView({
        "route": "chappy",
        "channel": "two"
    })}, [])
    
    return (
        <>
            <p>This is a private chat</p>
        </>
    )
}

export default GroupChatTwoView