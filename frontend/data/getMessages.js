import { API_URL } from "./constants";

async function getMessages(route, channel) {
    console.log('Getting messages...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
    }
    
    console.log(`Getting messages from group: ${route}, channel: ${channel}...`);

    const response = await fetch(API_URL + `message/${route}/${channel}`, options)

    const data = await response.json()

    console.log('Response: ', data);

    return data
}

export {getMessages}