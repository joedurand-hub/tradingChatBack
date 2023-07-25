import express from "express"
import path from 'path'
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import cors from 'cors'
import adminRoute from './routes/admin.routes.js'
import authRoute from './routes/auth.routes.js'
import chatRoute from './routes/chat.routes.js'
import messageRoute from './routes/messages.routes.js'

dotenv.config()

// Inicialization
const app = express()

const errorHandler = (error, req, res, next) => {
    console.log(error)
    res.status(500).json(`Algo ha salido mal: ${error}`)
    next()
};

var corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Credentials',
        'Accept',
        'X-Access-Token',
        'authtoken'
    ],
}


// Settings
app.use(errorHandler);
app.set('port', process.env.PORT || 8080)

// Middlewares
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));
app.use(express.json({ limit: "150mb" }));

// Routes
app.use(adminRoute)
app.use(authRoute)
app.use(chatRoute)
app.use(messageRoute)

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));
// const {pathname: root} = new URL('public', import.meta.url)
// app.use(express.static(path.join(__dirname, 'public')))


export default app;