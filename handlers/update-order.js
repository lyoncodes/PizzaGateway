const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function updateOrder(orderId, options){
  if (!options || !options.pizza || !options.address)
    throw new Error('There is no order to update')
  // dynamoDB update method
  // update()
  return docClient.update({
    TableName: 'pizza-orders',
    Key: {orderId: orderId},
    UpdateExpression: 'set pizza = :p, address=:a',
    ExpressionAttributeValues: {
      ':p': options.pizza,
      ':a': options.address
    },
    ReturnValues: 'ALL_NEW'
  }).promise()
    .then((result) => {
      console.log(`order: ${orderId} updated succesfully`)
      return result.Attributes
  }).catch((err) => {
      console.log('error: ', err)
      return err
    })
}
module.exports = updateOrder