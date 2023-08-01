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

const errorHandler = (error, req, res) => {
    console.error(error);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: "Algo ha salido mal",
        error: error.message || "Error desconocido",
    });
};

var corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://64c88b100daa69000719d0a7--beamish-taffy-b5d756.netlify.app/', 'https://main--beamish-taffy-b5d756.netlify.app/'],
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
app.use(errorHandler)

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));
// const {pathname: root} = new URL('public', import.meta.url)
// app.use(express.static(path.join(__dirname, 'public')))


export default app;