import MessageField from "../components/MessageField"
import ChannelsOrFriends from "../components/ChannelsOrFriends"
import { Outlet } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../ContextRoot";

function GroupView() {
    const {setIsOnGroup} = useContext(UserContext);
    
    setIsOnGroup(true)
    return (
        <div>
            <ChannelsOrFriends />
            <Outlet />
            <MessageField />
        </div>
    )
}

export default GroupView