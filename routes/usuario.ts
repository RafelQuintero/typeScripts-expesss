//debo inportar  Router  que viene de express

import { Router } from 'express';
import {
	deletetUsuario,
	getUsuario,
	getUsuarios,
	postUsuario,
	putUsuario,
} from '../contollers/usuario';
import { check } from 'express-validator';
import validarCampos from '../middelwares/validar-campos';

//recurede importa validarCamps

//fin de imprtar validar campos

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', getUsuario);

router.post(
	'/',
	[
		check('nombre', 'EL nombre ess obligatorio ').not().isEmpty(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy revizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errores not() ==Not() tiene que estar y isEmpty()===Vacio
		check('email', 'EL correo no es valido ').isEmail(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy rebizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errore
		validarCampos,
	],
	postUsuario,
);

router.put(
	'/:id',
	[
		check('nombre', 'EL nombre es obligatorio ').not().isEmpty(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy revizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errores not() ==Not() tiene que estar y isEmpty()===Vacio
		check('email', 'EL correo no es valido ').isEmail(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy rebizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errore
		validarCampos,
	],
	putUsuario,
);

router.delete('/:id', deletetUsuario);

//Como neccesito exportar ruter por defecto
export default router;
