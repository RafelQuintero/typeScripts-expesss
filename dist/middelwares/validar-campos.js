"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator"); //Validar campos no es mas que una funcion
const validarCampos = (req, res, next) => {
    //? como esta funcion es un un middelware debe tene un tercer argumento llamdo nex
    const validarErrores = (0, express_validator_1.validationResult)(req);
    if (!validarErrores.isEmpty()) {
        //si no hay errrores es el significado de:validarErrores.isEmpty()
        res.status(400).json(validarErrores);
        //asi no recargamos un metodo para poder ejecutar un return y asi finalizamos el método
        return;
    }
    next();
};
exports.default = validarCampos;
//# sourceMappingURL=validar-campos.js.map