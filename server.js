import express from 'express';
import cors from 'cors';

// Directory stuff
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Routers
import userRouter from './backend/routes/user.js'
import messageRouter from './backend/routes/message.js'

// Configuration
const PORT = 666
const SECRET = 'terracotta'

const app = express()

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

app.use('/api/user', userRouter)

app.use('/api/message', messageRouter)

app.get('*', (req, res) => {
    res.sendFile(join(dist, 'index.html'))
})

// Start server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

export default SECRET