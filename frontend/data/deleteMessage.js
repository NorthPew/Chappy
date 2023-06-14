import { API_URL } from "./constants";

async function deleteMessage(route, channel, messageId) {
    console.log("Deleting message...");

	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}

    console.log(`Deleting message from GROUP/DM: ${route}, channel/user: ${channel}`);

    const response = await fetch(API_URL + `message/${route}/${channel}/${messageId}`, options)
	const statusObject = await response.json()

    console.log('Response from API: ', statusObject);

    return {
        deleted: statusObject.status
    }
}

export default deleteMessage