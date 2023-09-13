const {DynamoDBClient} = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const dataConnection = {
    region: 'localhost', // Aquí pondremos la región de aws que estemos utilizando
    endpoint: 'http://localhost:8000', // El endpoint de conección a base de datos   
    accessKeyId: 'AWS_ACCESS_KEY_ID',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' 
};

let connection = null;

module.exports.connectionDB = () => {
    if(connection) return connection;
    const client = process.env.IS_OFFLINE ? new DynamoDBClient(dataConnection) : new DynamoDBClient();
    connection = DynamoDBDocumentClient.from(client);  
    return connection;
}