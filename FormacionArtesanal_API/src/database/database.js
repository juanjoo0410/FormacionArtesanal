import dotenv from 'dotenv'
import { createConnection } from "mysql2/promise";
dotenv.config();
const connection = await createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345',
	database: 'ug_artesanal',
});

export const getConnection = async () => {
	return connection;
};


