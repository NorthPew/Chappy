import express from 'express'
import { getDb } from '../database/database.js'

const router = express.Router();
const db = getDb();

router.get('/:route', async (req, res) => {
    let route = req.params.route;
    
    await db.read()

    if (route === "groups") {
        const groups = db.data.routes.groups.map((group) => {
            return group;
        });

    res.send(groups);
    } else if (route === "users") {
        const users = db.data.routes.users.map((user) => {
            return user;
        });

        res.send(users);
    }
})

export default router