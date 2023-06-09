import { API_URL } from "./constants";

async function getMessages(route, channel) {
    console.log('Getting messages...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
    }

    if (route === 'chappy') {
        console.log('Getting messages from group chappy...');
        if (channel === 'one') {
            console.log('Getting messages from group chappy, channel one');
            const response = await fetch(API_URL + 'message/chappy/one', options)
            const data = await response.json()
            console.log('Response: ', data);
            return data
        }
    }
}

export {getMessages}