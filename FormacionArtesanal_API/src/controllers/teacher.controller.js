import { getConnection } from "./../database/database.js";

export const getTeacher = async (req, res) => {
	try {
		const connection = await getConnection();
		const id=req.params.id;
		const [rows] = await connection.execute('SELECT * from docentes where id=?',[id]);
		if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"Ese estudiante no existe"});
		}
	} catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const insertTeacher=async(req,res)=>{
	try {
		const { cedula, nombres, apellidos, 
			edad, direccion, email, telefono, contra, rol_id, nivel_educativo_id } = req.body;
		const connection = await getConnection();
		const query = `INSERT INTO docentes (cedula, nombres, apellidos, edad, direccion, email, 
			telefono, contra, rol_id, nivel_educativo_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		const [result] = await connection.execute(query, [cedula, nombres, apellidos, edad, 
			direccion, email, telefono, contra, rol_id, nivel_educativo_id]);
		res.json({
			id: result.insertId,
			message: "Docente creado correctamente"
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocurrió un error al crear el estudiante" });
	}
}