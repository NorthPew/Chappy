import express from 'express'
import { getDb } from '../database/database.js'


const router = express.Router();
const db = getDb();

// GET - Group (Chappy) or DM Messages
router.get('/:route/:channel', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    let route = req.params.route // Group or DM
    let channel = req.params.channel // Public Chat (1, 2, 3) or Hajime

    await db.read()

    let combinedChatRoute;

    if (route !== 'dm') {
        if (!db.data.messages.groups.hasOwnProperty(route)) {
            res.status(404).send({message: `Group or channel not found. Got: ROUTE: ${route} and CHANNEL: ${channel}`})
        } else {

            // combinedChatRoute is route and channel combined
            combinedChatRoute = db.data.messages.groups[route].channels[channel]

            res.send(combinedChatRoute) 
        }
    } else {
            combinedChatRoute = db.data.messages.dms[channel]

            res.send(combinedChatRoute)
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
    let edited = false

    function generateId() {
        return Math.floor(Math.random() * 1000000 - 1);
    }

    let newMessage = {
        id: generateId(),
        content,
        edited,
        time,
        date,
        sender,
    }

    await db.read()

    // Checks if the message will be sent to group first or DM second
    if (route !== 'dm') {

        if(!db.data.messages.groups[route]) {
            db.data.messages.groups[route] = {"channels": {[channel]: []} };
            await db.write();

            db.data.messages.groups[route].channels[channel].push(newMessage);

            await db.write();

            res.send(newMessage);

          } else if (!db.data.messages.groups[route].channels[channel]) {
            db.data.messages.groups[route].channels[channel] = [];

            await db.write();
            
            db.data.messages.groups[route].channels[channel].push(newMessage);

            await db.write();

            res.send(newMessage);
          } else {
            db.data.messages.groups[route].channels[channel].push(newMessage);

            await db.write();

            res.send(newMessage);
          }
        } else {
            if(!db.data.messages.dms[channel]) {
                db.data.messages.dms = []
                await db.write();
    
                db.data.messages.dms[channel].push(newMessage);
    
                await db.write();
    
                res.send(newMessage);
            }
            
            db.data.messages.dms[channel].push(newMessage);

            await db.write();

            res.send(newMessage);

    }
})

// PUT - Message by id
router.put('/:route/:channel/:id', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    
    // Params
    let route = req.params.route
    let channel = req.params.channel
    let id = Number(req.params.id) // Message ID

    await db.read()

    let combinedChatRoute;

    // Checks if the message will be sent to group first or DM second
    if (route !== 'dm') {
        let editedChatMSG = req.body;

        combinedChatRoute = db.data.messages.groups[route].channels[channel]

        let oldChatMSG = combinedChatRoute.find(message => message.id === id)

        oldChatMSG.content = editedChatMSG.content
        oldChatMSG.time = editedChatMSG.time
        oldChatMSG.date = editedChatMSG.date
        oldChatMSG.edited = editedChatMSG.edited

        combinedChatRoute[oldChatMSG] = editedChatMSG
    
        await db.write()
    
        res.status(200).send(editedChatMSG)
    } else {
        let editedChatMSG = req.body;

        combinedChatRoute = db.data.messages.dms[channel]

        let oldChatMSG = combinedChatRoute.find(message => message.id === id)

        oldChatMSG.content = editedChatMSG.content
        oldChatMSG.time = editedChatMSG.time
        oldChatMSG.date = editedChatMSG.date
        oldChatMSG.edited = editedChatMSG.edited

        combinedChatRoute[oldChatMSG] = editedChatMSG

        await db.write()

        res.status(200).send(editedChatMSG)
    }
})

// DELETE - Message by id
router.delete('/:route/:channel/:id', async (req, res) => {
    // Route will be a DM or group
    // Channel will be specific chat in a group or DM for a chat with a user
    
    // Params
    let route = req.params.route
    let channel = req.params.channel
    let id = Number(req.params.id) // Message ID

    await db.read()

    let combinedChatRoute;

    // Checks if the message will be sent to group first or DM second
    if (route !== 'dm') {
        combinedChatRoute = db.data.messages.groups[route].channels[channel]

        let messageToDelete = combinedChatRoute.find(message => message.id === id)

        if(!messageToDelete) {
            return res.status(400).send({ message: 'Kunde inte hitta meddelandet!'})
        } else {
            db.data.messages.groups[route].channels[channel] = combinedChatRoute.filter((message) => message.id !== id)

            await db.write()

            res.status(200).send(combinedChatRoute)
        }
    } else {
        combinedChatRoute = db.data.messages.dms[route].channels[channel]

        let messageToDelete = combinedChatRoute.find(message => message.id === id)

        if(!messageToDelete) {
            return res.status(400).send({ message: 'Kunde inte hitta meddelandet!'})
        } else {
            db.data.messages.groups[route].channels[channel] = combinedChatRoute.filter((message) => message.id !== id)

            await db.write()

            res.status(200).send(combinedChatRoute)
        }
    }
})


export default router