'use strict'
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()
module.exports = function updateStatus(request){
  if (!request.orderId || !request.status)
    throw new Error('Order ID and delivery status are required but are not being provided')
  return docClient.update({
    TableName: 'pizza-orders',
    Key: {
      orderId: request.orderId
    },
    AttributeUpdates: {
      orderStatus: {
        Action: 'PUT',
        Value: request.status
      }
    }
  }).promise()
    .then(() => {
      console.log(`order status updated to: ${request.status} on: ${orderId}`)
    })
    .then(() => {
      return {}
    })
}