import express from 'express'
import { getDb } from '../database/database.js'

const router = express.Router();
const db = getDb();

router.get('/', async (req, res) => {
    await db.read()

        const groups = db.data.groups
        res.send(groups);
})

export default router