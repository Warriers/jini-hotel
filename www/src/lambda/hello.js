// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
export function handler(event, context, callback) {
    console.log('queryStringParameters', event.queryStringParameters)
    setTimeout(() => 1, 3000)
    callback(null, {
        // return null to show no errors
        statusCode: 200, // http status code
        body: JSON.stringify({
            msg: 'Aloy, World! ' + Math.round(Math.random() * 10)
        })
    })
}