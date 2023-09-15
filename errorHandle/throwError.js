const middy = require('@middy/core'); // Importación de librería middy
const httpErrorHandler = require('@middy/http-error-handler') // Middleware de middy
const createError = require('http-errors')
const middlewares = require('../config/middleware').middlewares;

const throwError = (event) => {
    const id = parseInt(event.pathParameters.id)

    console.log(id);

    if(id < 10){
        throw createError(500, 'El número es menor que 10')
    } else if(id > 10 && id < 21){
        throw createError(400, 'El número es mayor que 10 y menor que 21')
    } else {
        throw createError[400]
    }
}

module.exports.middyWrapper = middy(throwError).use(httpErrorHandler()).use(middlewares.errorLogMiddleware()).use(middlewares.inputValidationMiddleware());