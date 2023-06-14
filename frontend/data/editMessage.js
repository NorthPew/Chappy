import { API_URL } from "./constants";

async function editMessage(route, channel, messageId, editedMessage) {
    console.log('Editing message...');
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMessage)
    }
    
    const response = await fetch(API_URL + `message/${route}/${channel}/${messageId}`, options)

    const data = await response.json()

    console.log('Response: ', data);

    return data
}

export {editMessage}