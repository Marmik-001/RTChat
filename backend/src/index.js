import express, { response } from 'express'
import { configDotenv } from 'dotenv';
import authRoute from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
configDotenv();
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoute)
app.use('./api/message' , messageRoute)

app.listen(PORT  , () => {
    console.log('hello world' , PORT);
    connectDB();
})