import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import authRouter from './routes/authRoutes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import moviesRouter from './routes/moviesRoutes';

const app = express()
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL || 'default_url', { dbName: process.env.MONGO_DB_NAME })

//Routes
//Autenticacion
app.use('/auth', authRouter)
app.use('/movies',moviesRouter)
//movie
export default app;
