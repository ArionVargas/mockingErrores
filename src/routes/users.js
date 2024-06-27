import { Router } from "express"
import { getUsers, saveUser } from "../controllers/usersController.js"
import errorHandler from '../middlewares/errors/index.js'

const usersRouter = Router()

usersRouter.get('/',getUsers)

usersRouter.post('/createUser',saveUser)

usersRouter.use(errorHandler)

export default usersRouter