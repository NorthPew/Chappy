import express from 'express'
import jwt from 'jsonwebtoken'
import { getDb } from '../database/database.js'
import SECRET from '../../server.js'

const router = express.Router()

const db = getDb()

function generateToken(getUserID) {
    const hour = 60 * 60
    const payload = {userId: getUserID}
    const options = {expiresIn: 2 * hour}

    let token = jwt.sign(payload, SECRET, options)

    console.log('Signerad JWT: ', token);
    
    return token
}

// Get - users
router.get("/", async (req, res) => {
    await db.read()
    
    const users = db.data.users

    res.status(200).send(users)
})

// POST - login
router.post("/login", async (req, res) => {

    // Reading database
    await db.read()
    const users = db.data.users

    // Variables for requesting body data
    let userName = req.body.username
    let userPassword = req.body.password

    if (!req.body || !userName || !userPassword) {
        res.status(401).send({ message: 'Användarnamn och lösenord får inte lämnas tomt!'})
        return
    }

    // Check if User (username) exists
    let findUser = users.find(user => user.username === userName)

    if (!findUser) {
        console.log('Felaktigt användarnamn');
        res.status(401).send({ message: 'Denna användaren existerar ej'})
        
        return
    }

    if (findUser.password !== userPassword) {
        console.log('Felaktigt lösenord');
        res.status(401).send({message: 'Felaktigt användarnamn eller lösenord'})

        return
    }

    // Successful login! Create a JWT token and send it back
    

    let tokenPackage = {token: generateToken(findUser.id), username: findUser.username, id: findUser.id, status: "Success"}
    res.send(tokenPackage)
})


// POST - Sign up with token
router.post('/', async (req, res) => {
    await db.read()
    
    let userName = req.body.username
    let userPassword = req.body.password

    function generateID() {
        return Math.floor(Math.random() * 10000 - 1)
    }

    let createUser = {
        id: generateID(),
        username: userName,
        password: userPassword
    }

    if (!req.body || !userName || !userPassword) {
        res.status(400).send({ message: 'Användarnamn och lösenord måste vara ifyllda!'})

        return
    }

    db.data.users.push(createUser)

    await db.write()

    let registerPackage = {token: generateToken(createUser.id), username: createUser.username, id: createUser.id, status: "Success"}
    res.send(registerPackage)
})


// Delete - User by id
router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)

    await db.read()

    const users = db.data.users

    let userToDelete = users.find((user => user.id === id))

    if (!userToDelete) {
        return res.status(400).send({ message: 'Kunde inte hitta användaren!'})
    } else {
        db.data.users = users.filter((user) => user.id !== id)

        await db.write()

        return res.sendStatus(200)
    }
})


// PUT - Edit user
router.put('/:id', async (req, res) => {
    
    let id = Number(req.params.id)

    let editedUser = req.body

    await db.read()

    const users = db.data.users

    let userToEdit = users.find((user) => user.id === id)

    if(!userToEdit) {
        return res.status(400).send({message: 'Kunde inte hitta användaren'})
    } else {
        userToEdit.username = editedUser.username
        userToEdit.password = editedUser.password

        db.data.users[userToEdit] = editedUser;

        await db.write()

        res.status(200).send({status: "Success", username: editedUser.username})
    }

    
})


// GET - Authorization
router.get('/authorization', async (req, res) => {

    await db.read()

    const users = db.data.users

    let authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).send({ message: 'Du behöver vara autentiserad för att kunna delta'})

        return
    }

    let token = authHeader.replace('Bearer: ', '')

    try {
        let decoded = jwt.verify(token, SECRET)
        
        console.log('GET /authorization dekryptat: ', decoded);

        let userId = decoded.userId
        let user = users.find(user => user.id = userId)

        console.log(`Användaren ${user.username} har tillgång till låsta kanaler!`);

        res.status(202).send({ message: 'Du är autentiserad'})
    } catch (error) {
        console.log('GET /authorization felmeddelande: ', error.message)
        console.log(`Token: '${token}', Secret: ${SECRET}`);
        res.status(401).send({message: 'Du blev inte autentiserad!'})
    }
})

export default router