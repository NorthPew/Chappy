import MessageField from "../components/MessageField"
import ChannelsOrFriends from "../components/ChannelsOrFriends"
import { Outlet, useParams, useLoaderData } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../ContextRoot";

function GroupView() {
    const {setIsOnGroup} = useContext(UserContext);

    const { id } = useParams()
    const allGroups = useLoaderData()

    const group = allGroups.find(group => String(group.id) === id)
    
    if(!group) {
        return (
            <p>Denna grupp finns ej</p>
        )
    }

    setIsOnGroup(true)
    return (
        <div>
            <p>{group.title}</p>
            <ChannelsOrFriends />
            <Outlet />
            <MessageField />
        </div>
    )
}

export default GroupView