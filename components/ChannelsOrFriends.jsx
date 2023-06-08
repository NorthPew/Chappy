import { useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
    return (
        <Panel>
            {
                isOnGroup ?
                <>
                    <PanelLink to="/chappy"># Public Chat</PanelLink>
                    <PanelLink to="/chappy/private"># Private Chat<span className="material-symbols-outlined">lock</span></PanelLink>
                </> : <p>Friend 1</p>
            }
        </Panel>

    )
}

export default ChannelsOrFriends