const item = require('./config/constant').items

module.exports.handler = async (event) => {
    item.push('hola')
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Go Serverless v3.0! Your function executed successfully!",
          input: item,
        },
        null,
        2
      ),
    };
  };