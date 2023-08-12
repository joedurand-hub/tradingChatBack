import express from "express"
import path from 'path'
import http from "http"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import cors from 'cors'
import adminRoute from './routes/admin.routes.js'
import authRoute from './routes/auth.routes.js'
import chatRoute from './routes/chat.routes.js'
import messageRoute from './routes/messages.routes.js'

import { Server as SocketServer } from "socket.io"
dotenv.config()

// Inicialization
const app = express()
const server = http.createServer(app)

// export instance for new sockets in endpoints
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        optionsSuccessStatus: 200,

    }
})

const errorHandler = (error, req, res, next) => {
    console.log(error)
    res.status(500).json(`Algo ha salido mal: ${error}`)
    next()
};

var corsOptions = {
    origin: '*',
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
app.use(errorHandler);

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));
// const {pathname: root} = new URL('public', import.meta.url)
// app.use(express.static(path.join(__dirname, 'public')))






global.onlineUsers = new Map()

io.on('connection', (socket) => { // conexión del WebSocket.
    global.chatSocket = socket
    
    socket.on("enviar-mensaje", (message) => {
        console.log(message, socket.id)

        socket.broadcast.emit("mensaje-desde-server", message) //manda a todos menos a mi
    })
    socket.on("escribiendo", () => {

        socket.broadcast.emit("escribiendo-desde-server") //manda a todos menos a mi
    })

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
})


export default server;