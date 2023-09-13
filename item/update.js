'use strict';
const database = require('../config/dynamo').connectionDB;
const logs = require('../config/log');
const messages = require('../config/message');
const options = require('../config/constant');
const { PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

module.exports.updateItem = async (event) =>  {
    let body = null;
    console.log(event)
    try{
    let itemData = JSON.parse(event.body);
    const id = event.pathParameters.id;

    const {Item} = await database().send(new GetCommand({TableName: options.tableName, Key: {
        id: parseInt(id)
    }}))

    console.log(Item)

    Item.description = itemData.description;
    Item.name = itemData.name;

    await database().send(new PutCommand({TableName: options.tableName, Item}));
    body = {
      message: "Dato modificado correctamente",
      items: Item
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