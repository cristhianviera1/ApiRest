module.exports = (sequelize, Sequelize) => {
	const Telefono = sequelize.define('telefonos', {
	  numero: {
		  type: Sequelize.STRING
	  }
	});	
	return Telefono;
};