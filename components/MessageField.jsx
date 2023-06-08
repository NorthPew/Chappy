import { useContext } from "react";
import { UserContext } from "../src/ContextRoot";
import styled from "styled-components";

const MessageWrapper = styled.div`
    width: calc(100% - 200px);
    height: 64px;
    display: grid;
    place-content: center;
    float: left;
`

const MessageInput = styled.input`
    border-radius: 7.5px;
    background-color: #424549;
    width: 80vw;
    border: none;
    padding: .85em .75em;
    outline: none;
`

function MessageField() {
    const {isLoggedIn} = useContext(UserContext);
    return (
        <MessageWrapper>
       { isLoggedIn ?
        <MessageInput type="text" placeholder="Skicka ett meddelande" ></MessageInput>
        : <MessageInput type="text" disabled placeholder="Du måste vara inloggad för att skicka ett meddelande"></MessageInput>
    }
    </MessageWrapper>
    )
}

export default MessageField
