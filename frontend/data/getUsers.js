import { API_URL } from "./constants";

async function getUsers(route) {
    console.log('Getting groups...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
    }
    
    const response = await fetch(API_URL + 'user/', options)

    const data = await response.json()

    console.log('Response: ', data);

    return data
}

export {getUsers}