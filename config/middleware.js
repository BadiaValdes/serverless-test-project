const { ILogger, logFactory } = require('aws-bunyan');
const logs = require('./log')
const logTypes = require('./constant').bunyanLogType

const logInstance = logFactory.createLogger('MiddlewareLogs')


const inputValidationMiddleware = () => { // Declaro mi middleware
    return {
        before: async (handler) => { // Podemos tener tres tipos de llamadas del middleware before | after | onError
            const { httpMethod, pathParameters } = handler.event; // Desagregamos el objeto event del handler que estemos usando

            if(pathParameters.id > 100){ // Preguntamos si el id es mayor a 100
                pathParameters.id = 5; // Le asignamos el valor 5 al id
            }
            handler.event.pathParameters = pathParameters; // Asignamos el nuevo cuerpo al handler
        }
    }
}

const errorLogMiddleware = () => { // Declaro mi middleware
    return {
        onError: async (handler, next) => { // En este caso vamos a crear un middleware que se ejecute cuando exista un error
          const {error} = handler; // Sacamos el valor del error del handler

          // Lo imprimimos en la consola
          logs.bunyanWriteLog(logInstance, logTypes.error, 'Log from middleware using bunyan');
          logs.bunyanWriteLog(logInstance, logTypes.warn, 'Log from middleware using bunyan', {hola: "mundo"});

          // Modificamos la respuesta
          handler.response = {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({
              message: 'Error en el middleware',
            }),
          }
        }
    }
}

module.exports.middlewares = {
    inputValidationMiddleware,
errorLogMiddleware,
}