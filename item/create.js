'use strict';
const database = require('../config/dynamo').connectionDB;
const logs = require('../config/log');
const messages = require('../config/message');
const options = require('../config/constant');
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.createItem = async (event) =>  {
    let body = null;
    let itemData = JSON.parse(event.body);
    console.log(event);
    try{
    const {Items} = await database().send(new PutCommand({TableName: options.tableName, Item: itemData}));
    body = {
      message: "Dato creado correctamente",
      items: Items
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