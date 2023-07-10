import { getConnection } from "./../database/database.js";

export const getCrendentials = async (req, res) => {
	try {
        const correo = req.body.cedula;
        const password = req.body.contra;
		const connection = await getConnection();
		const query = `select id,rol_id from docentes where cedula = ? and contra= ?
        union
        select id,rol_id from estudiantes where cedula = ? and contra= ?`;
		const [rows] = await connection.execute(query,[correo,password,correo,password]);
        if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"El usuario o contraseña es incorrecto"});
		}
	} catch (error) {
        console.log(error);
         res.status(500).json({ message: "ocurrio un error"});
    }
};
