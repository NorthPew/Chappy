import { useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Panel = styled.div`
    width: 190px;
    height: calc(100vh - 51px);
    float: left;
    display: flex;
    background-color: #1e2124;
    padding-top: 7.5px;
    padding-bottom: 7.5px;
    padding-left: 10px;
    justify-content: flex-start;
    flex-flow: column wrap;
    row-gap: 7.5px;
    background-color:#282b30;
    color: #424549;
    position: relative;
`

const PanelLink = styled(Link)`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    text-decoration: none;
`

function ChannelsOrFriends() {
    const {isLoggedIn, isOnGroup} = useContext(UserContext);
    return (
        <Panel>
            {
                isOnGroup ?
                <>
                    <PanelLink to="/">Chat 1</PanelLink>
                    <PanelLink to="/">Chat 2<span className="material-symbols-outlined">lock</span></PanelLink>
                </> : <p>Friend 1</p>
            }
        </Panel>

    )
}

export default ChannelsOrFriends