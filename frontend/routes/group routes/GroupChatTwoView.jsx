import { useContext } from "react";
import { UserContext } from "../../ContextRoot";

function GroupChatTwoView () {
    const {setWhereToSendMessageToView} = useContext(UserContext);

    setWhereToSendMessageToView("chappy-groupchat-two")
    return (
        <>
            <p>This is a private chat</p>
        </>
    )
}

export default GroupChatTwoView