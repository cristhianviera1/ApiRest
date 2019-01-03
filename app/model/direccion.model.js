module.exports = (sequelize, Sequelize) => {
	const Direccion = sequelize.define('direccion', {
	  sector: {
          type: Sequelize.STRING
	  },
	  callePrincipal: {
          type: Sequelize.STRING
	  },
	  calleSecundaria: {
          type: Sequelize.STRING
      },
      nLote: {
          type: Sequelize.STRING
      },
      referencia:{
          type: Sequelize.STRING
      }
	});
	return Direccion
}