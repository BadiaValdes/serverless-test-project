'use strict';
const database = require('../config/dynamo').connectionDB;
const logs = require('../config/log');
const messages = require('../config/message');
const options = require('../config/constant');
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");


module.exports.getItems = async (event) => {
    let body = null;
    console.log(event);
    try{
    const {Items} = await database().send(new ScanCommand({TableName: options.tableName,}));
    body = {
      message: "Todos los datos devueltos",
      items: Items
    }
  }
  catch(e){
    logs.writeLog(e);
    body = {
      title: "Hubo un error en el proceso de ",
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