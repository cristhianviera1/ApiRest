const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.personas = require('../model/persona.model.js')(sequelize, Sequelize);
db.direcciones = require('../model/direccion.model.js')(sequelize, Sequelize);
db.telefonos = require('../model/telefono.model.js')(sequelize, Sequelize);
db.eventos = require('../model/evento.model')(sequelize,Sequelize);
db.tiposEventos = require('../model/tipoEvento.model')(sequelize,Sequelize);

//Modelos/Relaciones
db.telefonos.belongsTo(db.personas);
db.personas.hasMany(db.telefonos);

db.direcciones.belongsTo(db.personas);
db.personas.hasOne(db.direcciones);

db.eventos.belongsTo(db.tiposEventos);
db.tiposEventos.hasOne(db.eventos);

db.eventos.belongsTo(db.personas);
db.personas.hasOne(db.eventos);

module.exports = db;