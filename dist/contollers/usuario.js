"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletetUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
//todod import { validationResult } from 'express-validator';//Validar campos no es mas que una funcion fue lleva para el archiovo validar-campos.ts
//Crearemos todos la fucnione que manejaran las ruras para los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Vamos a leer los usuarios y los mostramos en postman para saber que toda va bien
    //para que importe Usuario despues de escriibir el nombre le doy a la tecja tab -> <- y veo que lo importó
    const usuarios = yield usuario_1.default.findAll(); //REcurde  que me devuelve una promsa  por lo que debo colocar el metodo como async y await
    //  Ahora lo mando  a mostrar todos los usuario sutilizando  una respuesta con el json , pro va a prodcuir un error   , porque debeo crear las columnas de createdAt y updateAt
    res.json({
        usuarios,
        //msg: 'getUsuarios', //ya no lo necesito
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Vamos  a obtenr un usuario por el id y lo mostramos en pstman
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    //Hagamos un validacion si el usuario no existe
    if (!usuario) {
        res.status(400).json({
            msg: `No existe un ususario con el id ${id}`,
        });
    }
    else {
        res.json({
            usuario,
            // 	msg: 'getUsuario',
            // 	id,
        });
    }
});
exports.getUsuario = getUsuario;
///TOdO: Crear el usuario
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //confirmemeos todos loos errores que fueron guardados en  cada check de expresoo-validator en la req.
    //TODO: cortemos validar campo y lo llevams para para el archivo valdar-campos.ts
    //todo Fin de lo cotado de validar coampos
    const body = req.body;
    //debemos tener la referncia  body
    try {
        //?Decaramos  la variable existeEmail;  para ver si exist un correo en my tabala MySQL//
        const existeEmail = yield usuario_1.default.findOne({ where: { email: body.email } }); //! funcion de la siguiente manera: Busca en la la tabla llamada usuarios de la base de datos  el correo que se le mande en el body  y lo guarda en existeemail, pero si o existe lo guarda en existeEmail  pero como un null //esta instruccion se consiguio en la documentacion de sequelize en  seccion Model Quering-Finders
        //*costruccion de la funcion  para existe email
        //*fin de la fucnion uque emailExiste
        if (existeEmail) {
            res.status(400).json({
                msg: ` El corre: ${body.email} ya está registrado `,
            });
            return;
        }
        //?Fin de chequear la tabla de MySQL
        const usuario = yield usuario_1.default.create(body);
        res.json({
            msg: 'Usuario creado',
            usuario,
        });
    }
    catch (error) {
        console.log('El error es', error);
        res.status(500).json({
            msg: 'Comuniquese con el adminstrador',
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //debeoms tener el id del ususraruio
    const { id } = req.params;
    //Necesito en body para actualizar los datos del ususrio
    const body = req.body;
    //chequearemos ese   id que se manda en os parametros de la url is para ver si existe el usuarioy si existe lo actualizo
    try {
        const idUsuario = yield usuario_1.default.findOne({ where: { id } });
        if (!idUsuario) {
            res.status(400).json({
                msg: ' No exite el  usuario con el : ' + id,
            });
            return;
        }
        //Actualicemos el idUsuario ya que exite en la base de datos
        yield idUsuario.update(body);
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
    }
    catch (error) {
        console.log('El error es', error);
        res.status(500).json({
            msg: 'Comuniquese con el adminstrador',
        });
    }
    //debebos tener la referncia  body
});
exports.putUsuario = putUsuario;
const deletetUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //debeoms tener el id del ususraruio
    const { id } = req.params;
    //Se tiene dos tipos de eliminacio . una borrandola compeltamente de la bes de datos y la otra: manteniendola  la base de datos pero haciendolo inactivo el campo  Estado; colocando  boobleno en  false, con la finalidad de mantener la integridad de la base de datos
    try {
        const idUsuario = yield usuario_1.default.findByPk(id); //   la funcion findOne({ where: { id } }) fue sustituida por findByPk(id) que hace lo mismo;
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
        yield idUsuario.update({ estado: false });
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
    }
    catch (error) {
        console.log('El error es', error);
        res.status(500).json({
            msg: 'Comuniquese con el adminstrador',
        });
    }
});
exports.deletetUsuario = deletetUsuario;
//# sourceMappingURL=usuario.js.map