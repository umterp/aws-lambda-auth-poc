export const consumerHandler = async function (event: any, context: any) {
    console.log('Lambda running');
  
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: 'Lambda authorizer working!'
    };
  }