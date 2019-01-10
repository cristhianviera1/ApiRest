module.exports = function(app) {
    const controlador = require('../controller/controlador.js');
 
    // Create a new Customer
    app.get('/api/personas', controlador.findAll);
    app.get('/api/personas/:id', controlador.findById);
    app.post('/api/personas/addfk', controlador.createFK);
    app.post('/api/personas/add',controlador.creacionEvento)
/*
    // Create a new Customer
    app.post('/api/customers', customers.create);

     // Update a Customer with Id
    app.put('/api/customers', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:id', customers.delete);
*/
}