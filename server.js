import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js'

import connectDB from './config/db.js';

dotenv.config()

connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`.underline.yellow)
})