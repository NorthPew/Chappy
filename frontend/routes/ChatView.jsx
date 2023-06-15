// React & styled
import { useLoaderData, useParams } from "react-router-dom"
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";

import { UserContext } from "../ContextRoot";
import { editMessage } from "../data/editMessage";
import { getMessages } from "../data/getMessages"
import deleteMessage from "../data/deleteMessage";

import ChannelsOrFriends from "../components/ChannelsOrFriends";
import MessageField from "../components/MessageField"


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

const MessageEdited = styled.p`
    font-size: 12px;
    font-weight: thin;
    margin: 0px;
`

const MessageBoard = styled.ul`
    padding-left: 7.5px;
    height: calc(100vh - 92px);
    overflow-y: scroll;
    width: 86vw;
    float: left;
`

const MessageListElem = styled.li`
    list-style-type: none;
`

const MessageBtn = styled.button`
    padding: 5px;
    border: none;
    border-radius: 6.5px;
    cursor: pointer;
    background-color: transparent;
    color: #f1f1f1;

    &:hover {
        background-color: #424549;
    }
`

const MessageEditInputField = styled.input`
    border-radius: 7.5px;
    background-color: #424549;
    width: 80vw;
    border: none;
    padding: .85em .75em;
    outline: none;
`

export const loader = (dmName, dmUserId) => () => getMessages(dmName, dmUserId)


function ChatView() {

    const [editingMessage, setEditingMessage] = useState({});
    const [editMessageInput, setEditMessageInput] = useState("");

        // Context
        const {isLoggedIn, selectSpecificView, setSelectSpecificView, saveUserName, saveUserId, saveGroupName, setSaveGroupName, saveChannelId, setSaveChannelId, messageData, setMessageData, refreshMsgs } = useContext(UserContext);

        // Params
        const { name, id } = useParams();

        // To tell messageField where to send a message
        setSaveGroupName(name)
        setSaveChannelId(id)

    // To tell MessageField what to display
            useEffect(() => {
                setSelectSpecificView({
                    route: name,
                    channel: id
                })
            }, [name, id])


        // Changes what DM chat to display using params above
        useEffect(() => {
            const fetchData = async () => {
            const data = await loader(name, id)();
            setMessageData(data);
            };
            fetchData();
        }, [name, id]);


        // If messageData is still null
        if(!messageData) {
            return <div>Loading...</div>;
        }
        
        
    // Message stuff
    function onEditMessage(message) {
        setEditingMessage(message)
    }

    async function onSubmitEditedMessage(e) {
        e.preventDefault();

        if (editMessageInput !== "") {
            let currentDate = new Date().toJSON().slice(0, 10);
            let currentTime = new Date(new Date().getTime() + 1*60*60).toLocaleTimeString();
    
            let editedMessage = {
                content: editMessageInput,
                time: currentTime,
                date: currentDate,
                edited: true,
                sender: [{
                    "id": saveUserId,
                    "username": saveUserName
                }]
            }
    
            const result = await editMessage(saveGroupName, saveChannelId, editingMessage.id, editedMessage)
    
            console.log(result);
    
            setEditingMessage({})

            await refreshMsgs(saveGroupName, saveChannelId)
        }

    }

    function onChangeEditMessage(e) {
        setEditMessageInput(e.target.value)
    }

    async function onClickDeleteMessage(message) {
        deleteMessage(saveGroupName, saveChannelId, message.id)

        await refreshMsgs(saveGroupName, saveChannelId)
    }

    return (
        <>
           {messageData.map((message) => (
            <MessageListElem key={message.id}>
                {
                    editingMessage.id === message.id ?
                    (
                        <form onSubmit={onSubmitEditedMessage}>
                            <MessageEditInputField type="text" value={editMessageInput} onChange={onChangeEditMessage} placeholder={message.content}></MessageEditInputField>
                        </form>
                    )
                    : message.sender.map((sender) => (
                        isLoggedIn && saveUserName === sender.username && saveUserId === sender.id ?
                    <>
                        <MessageSenderTimeBox>
                            <MessageSender title={`#${sender.id}`}>{sender.username}</MessageSender>
                            <MessageDate>{message.date}</MessageDate>
                            <MessageTime>{message.time}</MessageTime>
                                    {
                            message.edited && 
                                <MessageEdited>
                                    (Edited)
                                </MessageEdited>
                            }
                            <MessageBtn title="Ändra på meddelandet" onClick={() => onEditMessage(message)}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </MessageBtn>
                            <MessageBtn title="Radera meddelandet" onClick={() => onClickDeleteMessage(message)}>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </MessageBtn>
                        </MessageSenderTimeBox>
                    </>
                    : <MessageSenderTimeBox>
                    <MessageSender title={`#${sender.id}`}>{sender.username}</MessageSender>
                    <MessageDate>{message.date}</MessageDate>
                    <MessageTime>{message.time}</MessageTime>
                    {
                    message.edited && 
                        <MessageEdited>
                            (Edited)
                        </MessageEdited>
                    }
                </MessageSenderTimeBox>

                ))}
                <MessageText>{message.content}
                </MessageText>
            </MessageListElem>
        ))}
            <MessageField />
        </>
    )
}

export default ChatView