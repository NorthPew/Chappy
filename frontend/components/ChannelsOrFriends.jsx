import { useContext } from "react";
import { UserContext } from "../ContextRoot";
import styled from "styled-components";
import { NavLink, useLoaderData } from "react-router-dom";
import { loader } from "./SideHeader";


const Panel = styled.div`
    width: 180px;
    height: calc(100vh - 51px);
    float: left;
    display: flex;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: flex-start;
    flex-flow: column wrap;
    row-gap: 7.5px;
    background-color:#282b30;
    color: #424549;
    position: relative;
`

const PanelLink = styled(NavLink)`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    text-decoration: none;
    padding: .25em .75em;
    border-radius: 7.5px;
    width: 150px;

    &.active {
        background-color: #424549;
        color: #f1f1f1;
    }
`

function ChannelsOrFriends() {
    const {isLoggedIn, isOnGroup} = useContext(UserContext);

    const allChannels = useLoaderData()

    return (
        <Panel>
            {
                isOnGroup ?
                <>
                    {
                        allChannels.map((group) => (
                            <>
                                {Object.values(group.channels).flat().map((channel) => (
                                    <PanelLink key={channel.id} to={`/group/${group.name}/channel/${channel.id}`}>
                                        {channel.title}</PanelLink>
                                ))}
                            </>
                        ))
                    }
                </> : <p>Friend 1</p>
            }
        </Panel>

    )
}

export default ChannelsOrFriends