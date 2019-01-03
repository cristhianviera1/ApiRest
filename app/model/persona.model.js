module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('personas', {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        }
    });    
    return Persona;
};

