//Previamente instalaremos las instalacion de expres  doteven y  cors en el proyectod como producción

//importe express , va dar un error pero es importante , porque lo dá :RECUNERED QUE ESTAMO SUTILZAMOS TYPPESCRIPT Y NO PUEDO UTILIZAR LFUNCION  require()'express

import express, { Application } from "express"; //aparece un error que se corrige con la instrccion npm i --save-dev @types/express instalandoal en el proyecto como desarrollo   en la ventana del teminal , habilitando todo el tipado de express, como si estubiera escrito en typescripts . note que cuando de instalo se eleimino el error. que aparecia en la palabra express y tAmbien desActruro "Aplication" de express para obtener de que tipo va a ser la propiedad que declae en el contructo
//import { Error } from 'sequelize';
import userRoutes from "../routes/usuario";

import cors from "cors";

import db from "../db/connection";

//creamos una class llamada server mapar uq sirva como servidor
class Server {
  //Como es tipado de typescript se debe declara las la proiedades  que vamos a utilzar , aparte de manera privadad
  private app: Application; //Aqui defino que app tiene la propeidad de ser del tipo express.Aplication donde express.Application se puede sustituir por Application ya qye fe extrajo de express cuando se importó
  private port: string; //Lopuedo definir cmon number o del tipo string

  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express(); //Primero se la asigno app al constructor y despues afuera de este la declaro como privada y de que tipo es para inicializarla en el constructor

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

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database has been established successfullt.");
    } catch (error) {
      //if (error instanceof Error) throw new Error(`${error}`);
      console.error("Unable to connect to the database:", error);
    }
  }

  //Crearemos el metodos paara los middelware que se ejeutan antes que se pase a jaecuar las rutas

  middelwares() {
    // configurara ek CORS; necestio previamentte importar el cors
    this.app.use(cors()); // Nota  dentro de cors cocolco {} y con CTR+space veo todaslos metods y propeidades ques pueden emplear.

    //conficurar (parseo) la Lectura del body
    this.app.use(express.json());

    // lere una Carpeta publica que se creara previamete enel archivo raiz para que lea contenifdo estático
    this.app.use(express.static("public"));
  }

  //?creamos la funcion routes() y dentro es um middelware

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }
  //?lEVANTEMOS EL SERVIDOR CREANDO UN MÉTOD listen()

  listen() {
    this.app.listen(this.port, () => {
      console.log("El servidor correindo en el puerto: " + this.port);
    });
  }
}

//Hagamos la exportacion por defecto  paratypescripts
export default Server;

// como vimos ya estamos conetados con la base de datos por lo que el proximo paso es :crear nuestro modelo para interactuar con la base de datso
