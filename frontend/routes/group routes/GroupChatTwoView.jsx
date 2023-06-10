import { useContext } from "react";
import { UserContext } from "../../ContextRoot";

function GroupChatTwoView () {
    const {setMessageNavigate} = useContext(UserContext);

    setMessageNavigate("chappy-groupchat-two")
    return (
        <>
            <p>This is a private chat</p>
        </>
    )
}

export default GroupChatTwoView