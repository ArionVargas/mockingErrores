import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateUserErrorInfoENG, generateUserErrorInfoESP , generateUserErrorInfoPOR } from "../services/errors/info.js";

import { generateUser } from '../utils.js'

const users = []

export const getUsers = async (req, res) => {
    try {
        let users = [];
        for (let i = 0; i < 10; i++) {
            users.push(generateUser());
        }
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios:" });
    }
}

export const saveUser = (req, res) => {

    const { firstName, age, email } = req.body;

    if (!firstName || !email) {
        CustomError.createError({
            name: "User Creation Error",
            cause: generateUserErrorInfoESP({ firstName, email }),
            message: "Error tratando de crear el usuario.",
            code: EErrors.INVALID_TYPES_ERROR
        })
    }


    const userDto = {
        firstName,
        age,
        email
    }
    if (users.length === 0) {
        userDto.id = 1;
    } else {
        userDto.id = users[users.length - 1].id + 1;
    }
    users.push(userDto);
    res.status(201).send({ status: "success", payload: userDto });

}