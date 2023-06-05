import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Configuration
const PORT = 666
const SECRET = 'Äppelpaj'

// Middleware
app.use( cors())
app.use( express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} Body:`, req.body);
    next();
})

// Directory
const weAreHere = dirname(fileURLToPath(import.meta.url))
const dist = join(weAreHere, './dist')
app.use(express.static(dist))

// Routes
app.get('*', (req, res) => {
    res.sendFile(join(dist, 'index.html'))
})

// Start server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})