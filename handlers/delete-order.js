const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

module.exports = function deleteOrder(orderId){
  return docClient.delete({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId
    }
  }).promise()
  .then((result) => {
    return result
  })
  .catch((deleteError) => {
    throw deleteError
  })
}