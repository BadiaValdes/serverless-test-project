'use-strict';
module.exports = class Constants {
    static tableName = 'itemTable';

    static infokeConfig = {
        FunctionName: "crud-dynamo-dev-chain2", // Name of the function convention service-stage-function
        InvocationType: "RequestResponse" , //"Event" || "RequestResponse" || "DryRun",
        // LogType: "None" || "Tail",
        // ClientContext: "STRING_VALUE",
        Payload: "BLOB_VALUE",
        // Qualifier: "STRING_VALUE",
    }

    static lambdaClientConfig = {
        endpoint: "http://localhost:3002",
        region: "eu-est-1",
        credentials: {
            accessKeyId: 'DEFAULT_ACCESS_KEY',
            secretAccessKey: 'DEFAULT_SECRET',
          },
    }
}