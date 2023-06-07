import express from 'express'
import { getDb } from '../database/database.js'
import SECRET from '../../server.js'

const router = express.Router()

const db = getDb()

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
    let findUser = users.find(user => user.name === userName)

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

    const hour = 60 * 60
    const payload = {userId: findUser.id}
    const options = {expiresIn: 2 * hour}

    let token = jwt.sign(payload, SECRET, options)

    console.log('Signerad JWT: ', token);

    let tokenPackage = {token: token}
    res.send(tokenPackage)
})


// POST - Sign up
router.post('/signup', async (req, res) => {
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
    res.status(200).send(createUser)
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

    let token = authHeader.replace('Bearer', '')

    try {
        let decoded = jwt.verify(token, SECRET)
        
        console.log('GET /authorization dekryptat: ', decoded);

        let userId = decoded.userId
        let user = users.find(user => user.id = userId)

        console.log(`Användaren ${user.username} har tillgång till låsta kanaler!`);

        res.status(202).send({ message: 'Du är autentiserad'})
    } catch (error) {
        console.log('GET /authorization felmeddelande: ', error.message)
        res.status(401).send({message: 'Du blev inte autentiserad!'})
    }
})

export default router