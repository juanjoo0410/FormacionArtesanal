import dotenv from 'dotenv'
import { createConnection } from "mysql2/promise";
dotenv.config();
const connection = await createConnection({
	host: '192.60.1.216',
	user: 'root',
	password: '12345',
	database: 'ug_artesanal',
});

export const getConnection = async () => {
	return connection;
};


