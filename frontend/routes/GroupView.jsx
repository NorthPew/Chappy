import MessageField from "../components/MessageField"
import ChannelsOrFriends from "../components/ChannelsOrFriends"
import { Outlet, useParams, useLoaderData } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../ContextRoot";

function GroupView() {
    const {setIsOnGroup} = useContext(UserContext);

    const { name } = useParams()
    const allGroups = useLoaderData()

    const findGroup = allGroups.find(group => String(group.name) === name)
    
    if(!findGroup) {
        return (
            <p>Denna grupp finns ej</p>
        )
    }

    setIsOnGroup(true)
    return (
        <div>
            <ChannelsOrFriends findGroup={findGroup} />
            <Outlet />
            <MessageField />
        </div>
    )
}

export default GroupView