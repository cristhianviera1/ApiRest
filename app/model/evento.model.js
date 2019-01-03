module.exports = (sequelize, Sequelize) => {
	const Evento = sequelize.define('eventos', {
      fecha:{
          type: Sequelize.DATE
      },
      hora:{
          type: Sequelize.TIME
      }
	});	
	return Evento;
};