import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Faker, en, es } from '@faker-js/faker';

const faker = new Faker({ locale: [es, en] });

export const generateUser = () => {
    let numOfProducts = parseInt(faker.string.numeric(1, { bannedDigits: ['0'] }));
    const roles = ['admin', 'usuario'];
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }
    return {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        products: products,
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        rol: roles[Math.floor(Math.random() * roles.length)]
    };
};

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        stock: parseInt(faker.string.numeric(1)),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()
    };
};

// Generate 100 products
export const generateMockProducts = (numProducts = 100) => {
    const products = [];
    for (let i = 0; i < numProducts; i++) {
        products.push(generateProduct());
    }
    return products;
}

export default __dirname;
