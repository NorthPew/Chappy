import { useLoaderData, useParams } from "react-router-dom"
import { getMessages } from "../data/getMessages"
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { UserContext } from "../ContextRoot";
import { loader } from "../components/SideHeader";


export const anotherLoader = (group, groupChannel) => getMessages(group.name, groupChannel)

function GroupChannelView () {
    const { name, id } = useParams()
    const allGroups = useLoaderData()

    const group = allGroups.find(group => String(group.name) === name)
    const groupChannel = allGroups.find(group => group.channels.some(channel => String(channel.id) === id))

    const messageData = anotherLoader(group, groupChannel);

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

export default GroupChannelView