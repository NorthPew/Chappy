import { useContext } from "react";
import { UserContext } from "../ContextRoot";
import styled from "styled-components";
import { sendMessage } from "../data/sendMessage";
import { useState } from "react";

const MessageWrapper = styled.div`
    width: 87vw;
    height: 56px;
    display: grid;
    place-content: center;
    float: left;
    position: absolute;
    bottom: 0px;
    margin-left: 10vw;
    background-color: #36393E;
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
    const {isLoggedIn, selectSpecificView, saveUserName, saveUserId, refreshMsgs} = useContext(UserContext);

    const [messageContent, setMessageContent] = useState("")

    function handleOnChangeMessageField(e) {
        setMessageContent(e.target.value)
    }

    // Handlers
    async function handleOnSubmit(event) {
        event.preventDefault()

        if(messageContent !== "") {
            let currentDate = new Date().toJSON().slice(0, 10);
            let currentTime = new Date(new Date().getTime() + 1*60*60).toLocaleTimeString();

            let newMessage = {
                content: messageContent,
                time: currentTime,
                date: currentDate,
                sender: [{
                    "id": saveUserId,
                    "username": saveUserName
                }]
            }

            await sendMessage(selectSpecificView.route, selectSpecificView.channel, newMessage)

            setMessageContent("")

            await refreshMsgs(selectSpecificView.route, selectSpecificView.channel)
        } else {
            console.log('Skriv något innan du skickar!');
        }

    }


    return (
    <form onSubmit={handleOnSubmit}>
        <MessageWrapper>
            { isLoggedIn ?
                <MessageInput type="text" placeholder={`Send a message to channel ${selectSpecificView.channel}`} onChange={handleOnChangeMessageField} value={messageContent} ></MessageInput>
                : <MessageInput type="text" disabled placeholder="You need to be logged in to send messages"></MessageInput>
            }
        </MessageWrapper>
    </form>


    )
}

export default MessageField
