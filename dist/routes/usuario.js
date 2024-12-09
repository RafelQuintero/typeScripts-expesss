"use strict";
//debo inportar  Router  que viene de express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../contollers/usuario");
const express_validator_1 = require("express-validator");
const validar_campos_1 = __importDefault(require("../middelwares/validar-campos"));
//recurede importa validarCamps
//fin de imprtar validar campos
const router = (0, express_1.Router)();
router.get('/', usuario_1.getUsuarios);
router.get('/:id', usuario_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'EL nombre ess obligatorio ').not().isEmpty(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy revizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errores not() ==Not() tiene que estar y isEmpty()===Vacio
    (0, express_validator_1.check)('email', 'EL correo no es valido ').isEmail(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy rebizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errore
    validar_campos_1.default,
], usuario_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('nombre', 'EL nombre es obligatorio ').not().isEmpty(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy revizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errores not() ==Not() tiene que estar y isEmpty()===Vacio
    (0, express_validator_1.check)('email', 'EL correo no es valido ').isEmail(), //Le especifico que campo del boy quiero validar , lueguo debe decirle  exactamente que campo estoy rebizando ; recurede que lel check me esta preparardo los errores, e decir craeando en la request todos los errore
    validar_campos_1.default,
], usuario_1.putUsuario);
router.delete('/:id', usuario_1.deletetUsuario);
//Como neccesito exportar ruter por defecto
exports.default = router;
//# sourceMappingURL=usuario.js.map