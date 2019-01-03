module.exports = function(app) {
    const personas = require('../controller/persona.controller.js');
 
    // Create a new Customer
    app.get('/api/personas', personas.findAll);
    app.get('/api/personas/:id', personas.findById);
    app.post('/api/personas/addfk', personas.createFK);

/*
    // Create a new Customer
    app.post('/api/customers', customers.create);

     // Update a Customer with Id
    app.put('/api/customers', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:id', customers.delete);
*/
}