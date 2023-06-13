import { API_URL } from "./constants";

async function deleteUser(oneUser) {
    console.log("Deleting user...");

	const options = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	}
    const response = await fetch(API_URL + `user/${oneUser}`, options)
	const statusObject = await response.json()

    console.log('Response from API: ', statusObject);

    return {
        deleted: statusObject.status
    }
}

export default deleteUser