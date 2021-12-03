const pizzas = require('../data/pizzas.json')

function getPizzas(id) {
  if (!id)
    return pizzas
  
  const pizza = pizzas.find((pizza) => {
    return pizza.id == id
  })

  if (pizza)
    return pizza
  
  throw new Error('The pizza you requested was not found!')
}

module.exports = getPizzas