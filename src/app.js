import config from './config/config.js';
import express from 'express'
import usersRouter from './routes/users.js';
import mockingRouter from './routes/mocking.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/users',usersRouter)
app.use('/mockingproducts',mockingRouter)




const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT)
})