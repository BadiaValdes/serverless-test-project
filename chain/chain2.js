module.exports.chain2 = async (event, context, callback) => {
    try{
        if(event?.headers){
            console.log('HTTP')
            return {
                statusCode: 200,
                body: JSON.stringify('Hola Mundo')
            }
        } else {
            console.log('invoke')
        return +event + 1;
    }
  
    } catch(e){
        if(callback){
            callback(e, null);
        }
        console.log(e)
    }
}