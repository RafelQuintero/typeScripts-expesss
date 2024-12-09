"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
//Ahora llamaos la funcion doten() PARA USUSRLA LA CPNFIGURACION PORD DEFECTO
dotenv_1.default.config();
//configuarar dot.env
const server = new server_1.default();
//lamemos al servidor
server.listen();
//Ahoar lo correomo  , es decir lo levanatamos
// veremo como la hacemos
//# sourceMappingURL=app.js.map