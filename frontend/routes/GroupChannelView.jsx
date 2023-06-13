import { useLoaderData, useParams } from "react-router-dom"
import { getMessages } from "../data/getMessages"
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../ContextRoot";

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
    height: calc(100vh - 92px);
    overflow-y: scroll;
    width: 86vw;
    float: left;
`

const MessageListElem = styled.li`
    list-style-type: none;
`

const EditMessageBtn = styled.button`
    padding: 20px;
`

export const loader = (groupName, groupChannel) => () => getMessages(groupName, groupChannel);

function GroupChannelView() {


    const {isLoggedIn, setSelectSpecificView, saveUserName} = useContext(UserContext);

    const { name, id } = useParams();
    const [messageData, setMessageData] = useState(null);

    useEffect(() => {
        setSelectSpecificView({
            route: name,
            channel: id
        })
    }, [])

  
    useEffect(() => {
      const fetchData = async () => {
        const data = await loader(name, id)();
        setMessageData(data);
      };
      fetchData();
    }, [name, id]);
  
    if (!messageData) {
      return <div>Loading...</div>;
    }

    return (
        <MessageBoard>
        {messageData.map((message) => (
            <MessageListElem key={message.id}>
                {message.sender.map((sender) => (
                    isLoggedIn && saveUserName === sender.username ?
                    <>
                        <MessageSenderTimeBox>
                            <MessageSender title={`#${sender.id}`}>{sender.username}</MessageSender>
                            <MessageDate>{message.date}</MessageDate>
                            <MessageTime>{message.time}</MessageTime>
                            <EditMessageBtn>Ändra</EditMessageBtn>
                        </MessageSenderTimeBox>
                    </>
                    : <MessageSenderTimeBox>
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