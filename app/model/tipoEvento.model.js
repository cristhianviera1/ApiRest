module.exports = (sequelize, Sequelize) => {
	const tipoEvento = sequelize.define('tiposEventos', {
      nombre:{
          type: Sequelize.STRING
      }
	});	
	return tipoEvento;
};