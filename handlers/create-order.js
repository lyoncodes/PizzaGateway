/* 
require AWS dependencies 
*/

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require('uuid')

/* 
  createOrder()
    - stores userData from nested objects within the context object of the request
    - stores a boolean value to represent the presence of the users' address
    - if no address exists, the user's default address is assigned from the authorizer.claims
    - puts an order, address, and username to the pizza-orders table in Dynamo DB
    - returns a promise and success/failure message
*/

module.exports = function createOrder(request){
  const userData = request.context.authorizer.claims;
  let userAddress = request.body && request.body.address;
  if (!userAddress) {
    let userAddress = JSON.parse(userData.address).formatted
  }
  if (!request.body || !request.body.pizza || userAddress)
    throw new Error('Please provide a pizza type!')

    return docClient.put({
      TableName: 'pizza-orders',
      Item: {
        cognitoUsername: userAddress['cognito:username'],
        orderId: uuidv4(),
        pizza: request.pizza,
        address: userAddress,
        orderStatus: 'pending'
      }
    }).promise()
    .then((res) => {
      console.log('Order is saved!', res)
      return res
    })
    .catch((saveError) => {
      console.log('There\'s been a problem saving your order', saveError)
      throw saveError
    })
}