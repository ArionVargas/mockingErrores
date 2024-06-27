import { Router } from "express"
import { addProductToCart, getMockProducts, removeProductFromCart } from '../controllers/mockingController.js'
import errorHandler from '../middlewares/errors/index.js'

const mockingRouter = Router()

mockingRouter.get('/', getMockProducts)
mockingRouter.post('/cart/add', addProductToCart)
mockingRouter.post('/cart/remove', removeProductFromCart)

mockingRouter.use(errorHandler);


export default mockingRouter