export default class CustomError {
    static createError({name='Errpr',cause,message,code=1}){
        const error = new Error(message,{cause})
        error.name=name
        error.code=code
        throw error
    }
}