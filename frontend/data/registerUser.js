import { API_URL } from "./constants";

async function registerUser(oneUser) {
	console.log("Registering user...");
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(oneUser)
	}
	const response = await fetch(API_URL + 'user/', options)
	const statusObject = await response.json()
	console.log('Response from API: ', statusObject);
    return {registered: statusObject.status,  username: statusObject.username, id: statusObject.id, token: statusObject.token}
}

export default registerUser;