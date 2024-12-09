import { DataTypes } from 'sequelize'; //es euvalente am mongouse cuando se require en node

//Necesito hacer referncia a la base de datos  por lo que tenemos que importarla  escribiendo db tab
import db from '../db/connection';

//definimos la base de datos

const Usuario = db.define('Usuario', {
	nombre: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	estado: {
		type: DataTypes.BOOLEAN,
	},
});

//Exportemos nuestro moodelo por defecto
export default Usuario;
//De Aqui en adelante es solo consumir nuestro modelo
