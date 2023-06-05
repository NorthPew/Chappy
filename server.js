import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

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

// Routes
