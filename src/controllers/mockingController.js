import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateMockProducts } from "../utils.js";
import {generateProductErrorInfoESP} from '../services/errors/info.js'

const products = generateMockProducts();
const carts = {}

export const getMockProducts = async (req, res, next) => {
    try {
        res.send({ status: "success", payload: products });
    } catch (error) {
        next(error);
    }
}

export const addProductToCart = (req, res, next) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return next(CustomError.createError({
            name: "Invalid Input Error",
            cause: "Faltan datos necesarios (userId, productId, quantity)",
            message: "Datos incompletos para agregar el producto al carrito.",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return next(CustomError.createError({
            name: "Product Not Found",
            cause: generateProductErrorInfoESP({ productId }),
            message: "Producto no encontrado.",
            code: EErrors.NOT_FOUND
        }));
    }

    if (!carts[userId]) {
        carts[userId] = [];
    }

    const cartProduct = carts[userId].find(p => p.productId === productId);
    if (cartProduct) {
        cartProduct.quantity += quantity;
    } else {
        carts[userId].push({ productId, quantity });
    }

    res.send({ status: "success", cart: carts[userId] });
}

export const removeProductFromCart = (req, res, next) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return next(CustomError.createError({
            name: "Invalid Input Error",
            cause: "Faltan datos necesarios (userId, productId)",
            message: "Datos incompletos para eliminar el producto del carrito.",
            code: EErrors.INVALID_TYPES_ERROR
        }));
    }

    if (!carts[userId]) {
        return next(CustomError.createError({
            name: "Cart Not Found",
            cause: `Carrito no encontrado para el usuario con ID ${userId}`,
            message: "Carrito no encontrado.",
            code: EErrors.NOT_FOUND
        }));
    }

    const productIndex = carts[userId].findIndex(p => p.productId === productId);
    if (productIndex === -1) {
        return next(CustomError.createError({
            name: "Product Not Found in Cart",
            cause: `Producto con ID ${productId} no encontrado en el carrito`,
            message: "Producto no encontrado en el carrito.",
            code: EErrors.NOT_FOUND
        }));
    }

    carts[userId].splice(productIndex, 1);
    res.send({ status: "success", cart: carts[userId] });
}