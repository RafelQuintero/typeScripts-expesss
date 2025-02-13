"use strict";
//Previamente instalaremos las instalacion de expres  doteven y  cors en el proyectod como producción
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
//importe express , va dar un error pero es importante , porque lo dá :RECUNERED QUE ESTAMO SUTILZAMOS TYPPESCRIPT Y NO PUEDO UTILIZAR LFUNCION  require()'express
const express_1 = __importDefault(require("express")); //aparece un error que se corrige con la instrccion npm i --save-dev @types/express instalandoal en el proyecto como desarrollo   en la ventana del teminal , habilitando todo el tipado de express, como si estubiera escrito en typescripts . note que cuando de instalo se eleimino el error. que aparecia en la palabra express y tAmbien desActruro "Aplication" de express para obtener de que tipo va a ser la propiedad que declae en el contructo
//import { Error } from 'sequelize';
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
//creamos una class llamada server mapar uq sirva como servidor
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: "/api/usuarios",
        };
        this.app = (0, express_1.default)(); //Primero se la asigno app al constructor y despues afuera de este la declaro como privada y de que tipo es para inicializarla en el constructor
        this.port = process.env.PORT || "8000"; //Previamente creo en la raiz del proyecto un archivo llamado .env y dentro de el defino el puerto 8000 : Pero ME ESTÁ DANDO UN ERROR YA QUE NO DEFINI el  port y d e que tipo es
        // y apar subsanar el otro error   debo utlizar el operador or para decir  que es '8000' PERO TYPO STRING
        //Métodos iniciales
        //llamemos la conexion// POr los momentos desconectemos bdConnectio()
        //this.dbConnection();
        //llamnenos el middelware
        this.middelwares();
        //Definr mis rutas para llamanrla por edio del constructor
        this.routes();
    }
    //TODO: Conectar base de datos
    //Usuario por defecto es: root , contraseña es : un string vacio
    //Creamos el metodo de conectaar base de datos debe ser dl tipo async
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database has been established successfullt.");
            }
            catch (error) {
                //if (error instanceof Error) throw new Error(`${error}`);
                console.error("Unable to connect to the database:", error);
            }
        });
    }
    //Crearemos el metodos paara los middelware que se ejeutan antes que se pase a jaecuar las rutas
    middelwares() {
        // configurara ek CORS; necestio previamentte importar el cors
        this.app.use((0, cors_1.default)()); // Nota  dentro de cors cocolco {} y con CTR+space veo todaslos metods y propeidades ques pueden emplear.
        //conficurar (parseo) la Lectura del body
        this.app.use(express_1.default.json());
        // lere una Carpeta publica que se creara previamete enel archivo raiz para que lea contenifdo estático
        this.app.use(express_1.default.static("public"));
    }
    //?creamos la funcion routes() y dentro es um middelware
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
    }
    //?lEVANTEMOS EL SERVIDOR CREANDO UN MÉTOD listen()
    listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor correindo en el puerto: " + this.port);
        });
    }
}
//Hagamos la exportacion por defecto  paratypescripts
exports.default = Server;
// como vimos ya estamos conetados con la base de datos por lo que el proximo paso es :crear nuestro modelo para interactuar con la base de datso
//# sourceMappingURL=server.js.map