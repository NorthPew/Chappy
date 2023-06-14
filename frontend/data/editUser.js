import { API_URL } from "./constants";

async function editUser(userId, editedUser) {
    console.log('Editing user...');
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser)
    }
    
    const response = await fetch(API_URL + `user/${userId}`, options)

    const statusObject = await response.json()

    console.log('Response: ', statusObject);

    return {edited: statusObject.status, username: statusObject.username, token: statusObject.token}
}

export {editUser}