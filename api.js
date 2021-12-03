const Api = require('claudia-api-builder')
const getHome = require('./handlers/get-home')
const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')
const getOrders = require('./handlers/get-orders')
const getActiveOrders = require('./handlers/get-active-orders')
const updateStatus = require('./handlers/update-status')

const api = new Api()

api.registerAuthorizer('authorizedUser', {
  providerARNs: ['arn:aws:cognito-idp:us-west-1:171763379488:userpool/us-west-1_zsDPrY79C']
});

api.get('/', request => { 
  return getHome()
})

api.get('/pizzas', (request) => {
  return getPizzas()
})

api.get('/pizzas/{id}', (request) => {
  return getPizzas(request.pathParams.id)
}, {
  error: 404
})

api.get('/orders', (request) => {
  return getOrders(request.pathParams.id)
}, {
  error: 400
})

api.get('/active-orders', (request) => {
  return getActiveOrders(request.pathParams.id)
}, {
  success: 200,
  error: 400
})

api.post('/orders', (request) => {
  return createOrder(request)
}, {
  success: 201,
  error: 400,
  cognitoAuthorizer: 'authorizedUser'
})

api.put('/orders/{id}', (request) => {
  return updateOrder(request.pathParams.id, request.body)
}, {
  error: 400
})

api.put('/orders/status/{id}', (request) => {
  return updateStatus(request.body)
}, {
  success: 200,
  error: 400
})

api.delete('/orders/{id}', (request) => {
  return deleteOrder(request.pathParams.id)
}, {
  success: 200,
  error: 400
})

module.exports = api