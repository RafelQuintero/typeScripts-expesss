//Importamos la Request y la Response de express
import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import { where } from 'sequelize';

//todod import { validationResult } from 'express-validator';//Validar campos no es mas que una funcion fue lleva para el archiovo validar-campos.ts

//Crearemos todos la fucnione que manejaran las ruras para los usuarios

export const getUsuarios = async (req: Request, res: Response) => {
	//Vamos a leer los usuarios y los mostramos en postman para saber que toda va bien
	//para que importe Usuario despues de escriibir el nombre le doy a la tecja tab -> <- y veo que lo importó

	const usuarios = await Usuario.findAll(); //REcurde  que me devuelve una promsa  por lo que debo colocar el metodo como async y await
	//  Ahora lo mando  a mostrar todos los usuario sutilizando  una respuesta con el json , pro va a prodcuir un error   , porque debeo crear las columnas de createdAt y updateAt

	res.json({
		usuarios,

		//msg: 'getUsuarios', //ya no lo necesito
	});
};

export const getUsuario = async (req: Request, res: Response) => {
	//Vamos  a obtenr un usuario por el id y lo mostramos en pstman

	const { id } = req.params;
	const usuario = await Usuario.findByPk(id);

	//Hagamos un validacion si el usuario no existe

	if (!usuario) {
		res.status(400).json({
			msg: `No existe un ususario con el id ${id}`,
		});
	} else {
		res.json({
			usuario,
			// 	msg: 'getUsuario',
			// 	id,
		});
	}
};

///TOdO: Crear el usuario

export const postUsuario = async (req: Request, res: Response) => {
	//confirmemeos todos loos errores que fueron guardados en  cada check de expresoo-validator en la req.
	//TODO: cortemos validar campo y lo llevams para para el archivo valdar-campos.ts

	//todo Fin de lo cotado de validar coampos

	const body = req.body;

	//debemos tener la referncia  body
	try {
		//?Decaramos  la variable existeEmail;  para ver si exist un correo en my tabala MySQL//
		const existeEmail = await Usuario.findOne({ where: { email: body.email } }); //! funcion de la siguiente manera: Busca en la la tabla llamada usuarios de la base de datos  el correo que se le mande en el body  y lo guarda en existeemail, pero si o existe lo guarda en existeEmail  pero como un null //esta instruccion se consiguio en la documentacion de sequelize en  seccion Model Quering-Finders

		//*costruccion de la funcion  para existe email

		//*fin de la fucnion uque emailExiste

		if (existeEmail) {
			res.status(400).json({
				msg: ` El corre: ${body.email} ya está registrado `,
			});
			return;
		}

		//?Fin de chequear la tabla de MySQL
		const usuario = await Usuario.create(body);

		res.json({
			msg: 'Usuario creado',
			usuario,
		});
	} catch (error) {
		console.log('El error es', error);

		res.status(500).json({
			msg: 'Comuniquese con el adminstrador',
		});
	}
};

export const putUsuario = async (req: Request, res: Response) => {
	//debeoms tener el id del ususraruio

	const { id } = req.params;

	//Necesito en body para actualizar los datos del ususrio
	const body = req.body;

	//chequearemos ese   id que se manda en os parametros de la url is para ver si existe el usuarioy si existe lo actualizo

	try {
		const idUsuario = await Usuario.findOne({ where: { id } });

		if (!idUsuario) {
			res.status(400).json({
				msg: ' No exite el  usuario con el : ' + id,
			});
			return;
		}

		//Actualicemos el idUsuario ya que exite en la base de datos
		await idUsuario.update(body);

		//Acutualicemos el usuario
		// const actulizadoUsuario = await Usuario.create({
		// 	where: { id },
		// 	INSERT: { nombre: body.nombre, email: body.email },
		// }); //Al hacerlo con los metodos ;  createo o  build,  lo crea, pero no lo guarda ;  proque ya esta creado debo cambiar la instrucccion  create por  metodo update( ) y le mando el body como argumento para hacer la actualizacion que quiero hacer al usuario .

		res.json({
			msg: 'Usuario Aculaizado',
			idUsuario,
		});

		// const { body } = req;
		// res.json({
		// 	msg: 'putUsuario',
		// 	body,
		// 	id,
		// });
	} catch (error) {
		console.log('El error es', error);

		res.status(500).json({
			msg: 'Comuniquese con el adminstrador',
		});
	}
	//debebos tener la referncia  body
};

export const deletetUsuario = async (req: Request, res: Response) => {
	//debeoms tener el id del ususraruio

	const { id } = req.params;

	//Se tiene dos tipos de eliminacio . una borrandola compeltamente de la bes de datos y la otra: manteniendola  la base de datos pero haciendolo inactivo el campo  Estado; colocando  boobleno en  false, con la finalidad de mantener la integridad de la base de datos

	try {
		const idUsuario = await Usuario.findByPk(id); //   la funcion findOne({ where: { id } }) fue sustituida por findByPk(id) que hace lo mismo;

		if (!idUsuario) {
			res.status(400).json({
				msg: ' No exite el  usuario con el : ' + id,
			});
			return;
		}

		//TODO: Aqui mandamos a hacern el estado inactivo del usuario para eleiminarlo de de la abse de datos  logicamente

		//todo  Dejemos como ejemplo la elimiacion fisica

		// await idUsuario.destroy();// Se coloc como comentario porque solo quera que se dmostrara educativamente que funciona

		//todo Fin de la eliminacion fisica
		await idUsuario.update({ estado: false });
		//todo ELiminacion logica

		//todo Fin de eleliminacion logica

		res.json({
			msg: '++++ Usuario eliminado ++++',
			idUsuario,
		});

		// lo colocamos como comentario ya que funciono el deleteUsuario
		// res.json({
		// 	msg: 'delettUsuario',
		// 	id,
		// });
	} catch (error) {
		console.log('El error es', error);

		res.status(500).json({
			msg: 'Comuniquese con el adminstrador',
		});
	}
};
