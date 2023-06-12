import { API_URL } from "./constants";

async function updateMessage(route, channel, message, id) {
    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    };


    console.log(`Updating message to GROUP/DM: ${route}, channel/user: ${channel}`);

    const response = await fetch(API_URL + `message/${route}/${channel}/${id}}`, options)
    const data = await response.json()
    
    console.log('Response: ', data);

    return data
}

export {updateMessage}