'use strict';
const database = require('../config/dynamo').connectionDB;
const logs = require('../config/log');
const messages = require('../config/message');
const options = require('../config/constant');
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.deleteItem = async (event) =>  {
    let body = null;
    try{
    const id = parseInt(event.pathParameters.id);

    await database().send(new DeleteCommand({TableName: options.tableName, Key: {
        id: id,
    }}));
    body = {
      message: "Dato eliminado correctamente",
    }
  }
  catch(e){
    logs.writeLog(e);
    body = {
      title: "Hubo un error en el proceso de creación de datos",
      message: e,
      items: []
    }
  }
    return {
      statusCode: 200,
      body: JSON.stringify(
        body,
        null,
        2
      ),
    };
  }