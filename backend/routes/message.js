import express from 'express'
import { getDb } from '../database/database.js'


const router = express.Router();
const db = getDb();

// GET - Group (Chappy) or DM Messages
router.get('/:route/:channel', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    let route = req.params.route
    let channel = req.params.channel

    await db.read()

    if (route === 'chappy' ) {
       
        let chappyChatOne = db.data.messages.groups.chappy.channels.one
        let chappyChatTwo = db.data.messages.groups.chappy.channels.two

        if (channel === 'one') {
            res.send(chappyChatOne)
        } else if (channel === 'two') {
            res.send(chappyChatTwo)
        }
    }
    if (route === 'DM') {
            // Channel will be a user
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

    if (route === 'chappy') {

        let chappyChatOne = db.data.messages.groups.chappy.channels.one
        let chappyChatTwo = db.data.messages.groups.chappy.channels.two

        if (channel === 'one') {
            chappyChatOne.push(newMessage)
            await db.write()
            res.status(200).send(newMessage)

        } else if (channel === 'two') {
            chappyChatTwo.push(newMessage)
            await db.write()
            res.status(200).send(newMessage)
        }
    }
})

export default router