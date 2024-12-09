import dotenv from 'dotenv';
import Server from './models/server';

//Ahora llamaos la funcion doten() PARA USUSRLA LA CPNFIGURACION PORD DEFECTO
dotenv.config();

//configuarar dot.env

const server = new Server();

//lamemos al servidor
server.listen();

//Ahoar lo correomo  , es decir lo levanatamos
// veremo como la hacemos
