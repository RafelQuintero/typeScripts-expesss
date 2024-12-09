import { validationResult } from 'express-validator'; //Validar campos no es mas que una funcion
import { Request, Response, NextFunction } from 'express'; //Tambien tenemos que extael de express para pode utilizarlo en ensta funcion

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
	//? como esta funcion es un un middelware debe tene un tercer argumento llamdo nex
	const validarErrores = validationResult(req);
	if (!validarErrores.isEmpty()) {
		//si no hay errrores es el significado de:validarErrores.isEmpty()
		res.status(400).json(validarErrores);
		//asi no recargamos un metodo para poder ejecutar un return y asi finalizamos el método
		return;
	}
	next();
};

export default validarCampos;
