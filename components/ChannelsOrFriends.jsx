import { useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import styled from "styled-components";

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
`

function ChannelsOrFriends() {
    const {isLoggedIn, isOnGroup} = useContext(UserContext);
    return (
        <Panel>
            {
                isOnGroup ?
                <p>Chat 1</p> :
                <p>Friend 1</p>
            }
        </Panel>

    )
}

export default ChannelsOrFriends