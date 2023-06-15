import { useContext } from "react";
import { UserContext } from "../ContextRoot";
import styled from "styled-components";
import { NavLink, useLoaderData } from "react-router-dom";
import { getUsers } from "../data/getUsers";

import AccountPanel from "./AccountPanel";

export const loader = () => getUsers()


const Panel = styled.div`
    width: calc(10vw - 20px);
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
    color: #666a70;
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
    color: #666a70;
    font-weight: 600;

    &.active {
        background-color: #424549;
        color: #f1f1f1;
    }

    &:hover {
        background-color: #424549;
        color: #f1f1f1;
    }
`

const DisabledPanelLink = styled.p`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    text-decoration: none;
    padding: .25em .75em;
    border-radius: 7.5px;
    width: 150px;
    color: #666a70;
    font-weight: 600;
`

const PanelTitleBox = styled.div`
    border-bottom: 2.5px solid #1e2124;
`

const PanelTitle = styled.h1`
    font-size: 22px;
    font-weight: 600;
`

function FriendsPanel () {
    const usersData = useLoaderData()
    return (
        <>
            <PanelTitleBox><PanelTitle>DMs</PanelTitle></PanelTitleBox>
            {
                usersData.map((user) => (
                    <PanelLink key={user.id} to={`/dm/${user.id}`}>{user.username}</PanelLink>
                ))
            }
        </>
    )
}

function ChannelsPanel ({findGroup}) {
    const {isLoggedIn} = useContext(UserContext);

    const allChannels = useLoaderData()
    return (
        <>
        <PanelTitleBox><PanelTitle>{findGroup.title}</PanelTitle></PanelTitleBox>
            {
                !isLoggedIn ?
                allChannels.map((group) => (
                    <>
                        {Object.values(group.channels).flat().map((channel) => (
                            channel.public ? (
                                <PanelLink key={channel.id} to={`/group/${group.name}/channel/${channel.id}`}>
                                    {channel.title}
                                </PanelLink>
                            ) : (
                                <DisabledPanelLink key={channel.id}>
                                    {`${channel.title} 🔒`}
                                </DisabledPanelLink>
                            )
                        ))}
                    </>
                ))
            : allChannels.map((group) => (
                <>
                    {Object.values(group.channels).flat().map((channel) => (
                            <PanelLink key={channel.id} to={`/group/${group.name}/channel/${channel.id}`}>
                                {channel.title}
                            </PanelLink>
                        )
                    )}
                </>
            )) }
        </>
    )
}

function ChannelsOrFriends({findGroup}) {
    const {isOnGroup} = useContext(UserContext);
    return (
        <>
            <Panel>
                {
                    isOnGroup ? <ChannelsPanel findGroup={findGroup} />
                    : <FriendsPanel />
                }
                
            </Panel>
            <AccountPanel />
        </>

    )
}

export default ChannelsOrFriends