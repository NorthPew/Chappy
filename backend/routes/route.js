import express from 'express'
import { getDb } from '../database/database.js'

const router = express.Router();
const db = getDb();

router.get('/:route', async (req, res) => {
    let route = req.params.route;
    
    await db.read()

    if (route !== "DM") {
        const groups = db.data.routes.groups.map((group) => {
            return group;
        });

    res.send(groups);
    } else {
        
    }
})

export default router