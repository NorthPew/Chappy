import { useLoaderData } from "react-router-dom"
import { getMessages } from "../../data/getMessages"
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../ContextRoot";

const MessageSender = styled.p`
    font-size: 18px;
    font-weight: 600;
    margin: 0px;
`

const MessageTime = styled.p`
    font-size: 12px;
    font-weight: thin;
    margin: 0px;
`

const MessageDate = styled.p`
    font-size: 12px;
    font-weight: thin;
    margin: 0px;
`

const MessageSenderTimeBox = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    column-gap: 10px;
`

const MessageText = styled.p`
    font-size: 16px;
`

const MessageBoard = styled.ul`
    padding-left: 7.5px;
    width: calc(100vw - 326px);
    float: left;
`

const MessageListElem = styled.li`
    list-style-type: none;
`

export const loader = () => getMessages('chappy', 'one')



function GroupChatOneView () {
    const messageData = useLoaderData();

    const {setMessageNavigate} = useContext(UserContext);

    setMessageNavigate("chappy-groupchat-one")

    return (
        <MessageBoard>
            {messageData.map((message) => (
                <MessageListElem key={message.id}>
                    {message.sender.map((sender) => (
                        <MessageSenderTimeBox>
                            <MessageSender title={`#${sender.id}`}>{sender.username}</MessageSender>
                            <MessageDate>{message.date}</MessageDate>
                            <MessageTime>{message.time}</MessageTime>
                        </MessageSenderTimeBox>
                    ))}
                    <MessageText>{message.content}</MessageText>
                </MessageListElem>
            ))}
        </MessageBoard>
    )
}

export default GroupChatOneView