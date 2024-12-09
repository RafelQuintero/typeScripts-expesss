"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importamos la libreria sequrlize
const sequelize_1 = require("sequelize"); //Importo el objeto propiaente de sequelize
//creamo un nuevar instancio de sequelize llamada db
//el username:'root y el password:'' , esun string vacioo
const db = new sequelize_1.Sequelize('node', 'root', '', {
    host: 'localhost', //direccion del sitio web (url) si estoy utilizando localmente será: localhost
    dialect: 'mysql', //Coloco el tipo de base de datos que estoy trabajando
    // logging:false; lo dejo como cometario, perque quiero que se vea  todo el sql en la consola ara estuduarkla
});
//exportemos la db
exports.default = db;
//Para utilizamos vamos al server.ts y lo lanzamos de ahi haciendo los codigos previamente
//# sourceMappingURL=connection.js.map