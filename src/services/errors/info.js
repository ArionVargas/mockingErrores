export const generateUserErrorInfoENG = (user)=>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * firstName: needds tobe a String,received ${user.firstName}
    *email: needs to be a String, received ${user.email}`
}

export const generateUserErrorInfoESP = (user) => {
    return `Una o más propiedades estaban incompletas o no eran válidas.
    Lista de propiedades requeridas:
    * firstName: necesita ser una cadena, recibido ${user.firstName}
    * email: necesita ser una cadena, recibido ${user.email}`
}

export const generateUserErrorInfoPOR = (user) => {
    return `Uma ou mais propriedades estavam incompletas ou não eram válidas.
    Lista de propriedades requeridas:
    * firstName: precisa ser uma string, recebido ${user.firstName}
    * email: precisa ser uma string, recebido ${user.email}`
}

export const generateProductErrorInfoESP = (product) => {
    return `El producto no se pudo encontrar o está incompleto.
    Lista de propiedades requeridas:
    * productId: necesita ser un ID válido, recibido ${product.productId}`;
};