import express from 'express'
import cors from 'cors';
import path from 'node:path'
import {fileURLToPath} from 'node:url'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
import {configDotenv} from 'dotenv'
configDotenv({path : './.env'})
const corsOptions = {
  origin: process.env.CORS_ORIGIN, 
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions))
app.use(express.static("public"))
// app.use(cookieParser())
app.use(express.json({limit : "16kb"}))
console.log(process.env.CORS_ORIGIN);
app.use(express.urlencoded({extended : true, limit:"16kb"}))

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, "/views"))

import userRouter from './routes/user.routes.js';
app.use('/users', userRouter)

import adminRouter from './routes/admin.routes.js';
app.use('/api/admin', adminRouter)



export default app