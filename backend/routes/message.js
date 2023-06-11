import express from 'express'
import { getDb } from '../database/database.js'


const router = express.Router();
const db = getDb();

// GET - Group (Chappy) or DM Messages
router.get('/:route/:channel', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    let route = req.params.route // Group or DM
    let channel = req.params.channel // Public Chat or Hajime

    await db.read()

    let combinedChat;

    if (route !== 'DM') {
        if (!db.data.messages.groups.hasOwnProperty(route)) {
            res.status(404).send({message: `Group or channel not found. Got: ROUTE: ${route} and CHANNEL: ${channel}`})
        } else {

            // combinedChat is route and channel combined
            combinedChat = db.data.messages.groups[route].channels[channel]

            res.send(combinedChat) 
        }
    } else {
        combinedChat = db.data.messages.dms[route].channels[channel]

        res.send(combinedChat)
    }
})

// POST - Group (Chappy) or DM Messages
router.post('/:route/:channel', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    
    // Params
    let route = req.params.route
    let channel = req.params.channel
    
    // Body
    let content = req.body.content;
    let time = req.body.time;
    let date = req.body.date;
    let sender = req.body.sender; // Will be an object with user and user id

    function generateId() {
        return Math.floor(Math.random() * 1000000 - 1);
    }

    let newMessage = {
        id: generateId(),
        content,
        time,
        date,
        sender
    }

    await db.read()

    let combinedChat;

    // Checks if the message will be sent to group first or DM second
    if (route !== 'DM') {

        // If a channel doesn't already exist, create a new one
        if (!db.data.messages.groups[route].channels[channel]) {
            
            let createNewChannel = db.data.messages.groups[route].channels;
            createNewChannel[channel] = [];

            await db.write()

            combinedChat = db.data.messages.groups[route].channels[channel]

            combinedChat.push(newMessage)
    
            await db.write()
    
            res.status(200).send(combinedChat)
        } else {
            combinedChat = db.data.messages.groups[route].channels[channel]

            combinedChat.push(newMessage)
    
            await db.write()
    
            res.status(200).send(combinedChat)
        }
    } else {

        if(!db.data.messages.dms[route].channels[channel]) {
            let createNewUserChannel = db.data.messages.dms[route].channels;
            createNewUserChannel[channel] = [];

            await db.write()

            combinedChat = db.data.messages.dms[route].channels[channel]

            combinedChat.push(newMessage)
    
            await db.write()

            res.status(200).send(combinedChat)
        } else {
            combinedChat = db.data.messages.dms[route].channels[channel]

            combinedChat.push(newMessage)
    
            await db.write()
    
            res.status(200).send(combinedChat)
        }
    }
})

export default router