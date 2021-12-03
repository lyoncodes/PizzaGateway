const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

function getActiveOrders(orderId) {
  if (typeof orderId === 'undefined')
    return docClient.scan({
      TableName: 'pizza-orders'
    }).promise()
      .then(result => result.Items)
  return docClient.get({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId,
      status: 'pending'
    }
  }).promise()
    .then(result => result.Item)
}

module.exports = getActiveOrders