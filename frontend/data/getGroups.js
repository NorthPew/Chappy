import { API_URL } from "./constants";

async function getGroups() {
    console.log('Getting groups...');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        } 
    }
    
    const response = await fetch(API_URL + 'group/', options)

    const data = await response.json()

    console.log('Response: ', data);

    return data
}

export {getGroups}