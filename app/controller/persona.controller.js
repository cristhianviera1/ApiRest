const db = require('../config/db.config.js');
const Persona = db.personas;
const Telefono = db.telefonos;
const Direccion = db.direcciones;

//Post a persona with FK
exports.createFK = (req, res) => {	
	// Save to PostgreSQL database
	Persona.create({
				"nombre": req.body.nombre, 
				"apellido": req.body.apellido
			})
			.then(persona => {		
			// Send created customer to client
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
				//res.json(persona);
			}).then(res.json("Guardado Exitósamente"))
			.catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
	});		
};
 
// Traer todas las Personasis
exports.findAll = (req, res) => {
	Persona.findAll({attributes:['nombre','apellido'],include:[
		{
		model: Telefono,
		attributes:['numero']
		},{
			model: Direccion,
			attributes:['sector','callePrincipal','calleSecundaria','nLote','referencia']
		}
]}).then(personas => {
			// Send All Customers to Client
			res.json(personas.sort(function(c1, c2){return c1.id - c2.id}));
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

// Find a Persona by Id
exports.findById = (req, res) => {	
	Persona.findById(req.params.id,
		{
			include:[Telefono]
		}
		).then(persona => {
			res.json(persona);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
}; 
// Update a Customer
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

// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Persona.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Persona Id = ' + id } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};