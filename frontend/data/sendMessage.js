import { API_URL } from "./constants";

async function sendMessage(route, channel, message) {
    console.log("Sending message...");
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    };


    console.log(`sending to GROUP/DM: ${route}, channel/user: ${channel}`);

    const response = await fetch(API_URL + `message/${route}/${channel}`, options)
    const data = await response.json()
    
    console.log('Response: ', data);

    return data
}

export {sendMessage}