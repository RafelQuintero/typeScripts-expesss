"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); //es euvalente am mongouse cuando se require en node
//Necesito hacer referncia a la base de datos  por lo que tenemos que importarla  escribiendo db tab
const connection_1 = __importDefault(require("../db/connection"));
//definimos la base de datos
const Usuario = connection_1.default.define('Usuario', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
});
//Exportemos nuestro moodelo por defecto
exports.default = Usuario;
//De Aqui en adelante es solo consumir nuestro modelo
//# sourceMappingURL=usuario.js.map