const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const consta = require('../config/constant');
const client = new LambdaClient(consta.lambdaClientConfig);
const {TextDecoder} = require('util')

module.exports.chain1 = async (event, context, callback) => {
    try{
    const key = event.pathParameters.id;
    const data = consta.infokeConfig;
    const input = {
        ...data,
        Payload: JSON.stringify(key)
    }
    const command = new InvokeCommand(input);
    console.log('here')
    const resp = await client.send(command);
    console.log(resp.Payload.transformToString('utf-8'));
    return {
        statusCode: 200,
        body: JSON.stringify(
          'nice',
          null,
          2
        ),
      };
} catch(e) {
    console.log(e)
}
}