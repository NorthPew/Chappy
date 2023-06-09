import { API_URL } from "./constants";

async function authorize(authToken) {
	console.log("Logging in user...");
	const options = {
		method: 'GET',
		headers: { 'Authorization': authToken },
	}
	const response = await fetch(API_URL + 'user/' + 'authorization' , options)
	const statusObject = await response.json()
	console.log('Response from API: ', statusObject);
    return {tokenMessage: statusObject.message}
}

export default authorize;