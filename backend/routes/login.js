import express from 'express'
import { getDb } from '../database/database'
import SECRET from '../../server'

const login = async (req, res) => {

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
}

export default login