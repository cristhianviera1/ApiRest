module.exports = function(app) {
    const controlador = require('../controller/controlador.js');
 
    // Create a new Customer
    app.get('/api/eventos', controlador.findAll);
    app.get('/api/eventos/:id', controlador.findById);
    app.post('/api/eventos/addfk', controlador.createFK);
    app.post('/api/eventos/add',controlador.creacionEvento)
    /*app.put('/api/customers', customers.update);*/

}