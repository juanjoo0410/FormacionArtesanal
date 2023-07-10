import { getConnection } from "./../database/database.js";

export const getStudent = async (req, res) => {
	try {
		const connection = await getConnection();
		const id=req.params.id;
		const query = 'SELECT * from estudiantes where id=?';
		const [rows] = await connection.execute(query,[id]);
		if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"Ese estudiante no existe"});
		}
	} catch (error) {
		console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const insertStudent=async(req,res)=>{
	try {
		const { cedula, nombres, apellidos, 
			edad, direccion, email, telefono, contra, rol_id, nivel_educativo_id,medio_id } = req.body;
		const connection = await getConnection();
		const query = `INSERT INTO estudiantes (cedula, nombres, apellidos, edad, direccion, email, 
			telefono, contra, rol_id, nivel_educativo_id,medio_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
		const [result] = await connection.execute(query, [cedula, nombres, apellidos, edad, 
			direccion, email, telefono, contra, rol_id, nivel_educativo_id,medio_id]);
		res.json({
			id: result.insertId,
			message: "Estudiante creado correctamente"
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocurrió un error al crear el estudiante" });
	}
}
