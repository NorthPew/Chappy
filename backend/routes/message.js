import express from 'express'
import { getDb } from '../database/database.js'


const router = express.Router();
const db = getDb();

// GET - Group (Chappy) Messages
router.get('/:route/:channel', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    let route = req.params.route
    let channel = req.params.channel

    if (route === 'chappy' ) {
        await db.read()

        let chappyChatOne = db.data.messages.groups.chappy.channels.one
        let chappyChatTwo = db.data.messages.groups.chappy.channels.two

        let selectSpecificGroupChat

        if (channel === 'one') {
                selectSpecificGroupChat = chappyChatOne;

                res.send(selectSpecificGroupChat)
        } else if (channel === 'two') {
                selectSpecificGroupChat = chappyChatTwo;

                res.send(selectSpecificGroupChat)
        }
    }
    if (route === 'DM') {

    }
})

export default router