import MessageField from "../components/MessageField"
import ChannelsOrFriends from "../components/ChannelsOrFriends"
import { Outlet } from "react-router-dom"

function GroupView() {
    return (
        <div>
            <ChannelsOrFriends />
            <Outlet />
            <MessageField />
        </div>
    )
}

export default GroupView