import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

dotenv.config()

connectDB()