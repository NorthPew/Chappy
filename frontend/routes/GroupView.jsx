import MessageField from "../components/MessageField"
import ChannelsOrFriends from "../components/ChannelsOrFriends"
import { Outlet, useLoaderData } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../ContextRoot";
import { getGroups } from "../data/getGroups";

export const loader = () => getGroups('group')

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