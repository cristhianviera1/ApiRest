const db = require('../config/db.config.js');
const Persona = db.personas;
const Telefono = db.telefonos;
const Direccion = db.direcciones;
const Evento = db.eventos;
const tipoEvento = db.tiposEventos;

/*exports.createFK = (req, res) => {	

	// req = solicitud de ingreso
	// res = respuesta hacía la petición

	// se exporta funciones para ser consumido por las rutas

	Persona.create({
				"nombre": req.body.nombre, 
				"apellido": req.body.apellido
			})
			.then(persona => {		
			for (i=0;i<req.body.numero.length;i++){
				Telefono.create({
					"numero":req.body.numero[i],
					"personaId": persona.id
				})					
			};
			Direccion.create({
				"sector": req.body.sector,
				"callePrincipal": req.body.callePrincipal,
				"calleSecundaria":req.body.calleSecundaria,
				"nLote":req.body.nLote,
				"referencia":req.body.referencia,
				"personaId": persona.id
			})

			}).then(res.json("Guardado Exitósamente"))
			.catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
	});		
};*/
 

exports.findAll = (req, res) => {
	
	Persona.findAll({attributes:['nombre','apellido'],include:[
		{
		model: Telefono,
		attributes:['numero']
		},{
			model: Evento,
			attributes:['fecha','hora'],
			include:[{
				model:tipoEvento,
				attributes:['nombre'],	
			}]
		},{
			model: Direccion,
			attributes:['sector','callePrincipal','calleSecundaria','nLote','referencia']
		}
]}).then(personas => {
			res.json(personas.sort(function(c1, c2){return c1.id - c2.id}));
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};



exports.findById = (req, res) => {	
	Persona.findById(req.params.id,{attributes:['nombre','apellido'],		
			include:[
				{
					model:Telefono,
					attributes:['numero']
				},{
					model: Direccion,
					attributes:['sector','callePrincipal','calleSecundaria','nLote','referencia']
				}
			]
		}
		).then(persona => {
			res.json(persona);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
}; 


	// Actualizar valores de Persona
exports.update = (req, res) => {
	const id = req.body.id;
	Persona.update( req.body, 
			{ where: {id: id} }).then(() => {
				res.status(200).json( { mgs: "Updated Successfully -> Persona Id = " + id } );
			}).catch(err => {
				console.log(err);
				res.status(500).json({msg: "error", details: err});
			});
};





exports.creacionEvento = (req, res) => {	

	// req = solicitud de ingreso
	// res = respuesta hacía la petición

	// se exporta funciones para ser consumido por las rutas
	console.log(req.body);
	Persona.create({
				"nombre": req.body.nombre, 
				"apellido": req.body.apellido
			})
			.then(persona => {		
			for (i=0;i<req.body.numero.length;i++){
				Telefono.create({
					"numero":req.body.numero[i],
					"personaId": persona.id
				})					
			};
			tipoEvento.create({
				"nombre": req.body.tipoEvento
			}).then(tipo =>{
				Evento.create({
					"fecha": req.body.fecha,
					"hora": req.body.hora,
					"tiposEventoId": tipo.id,
					"personaId": persona.id
				})
			});
			Direccion.create({
				"sector": req.body.sector,
				"callePrincipal": req.body.callePrincipal,
				"calleSecundaria":req.body.calleSecundaria,
				"nLote":req.body.nLote,
				"referencia":req.body.referencia,
				"personaId": persona.id
			})

			}).then(res.json("Guardado Exitósamente"))
			.catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
	});		
};
