import { getConnection } from "./../database/database.js";

export const gethomeworkByStudentId = async (req, res) => {
	try {
		const connection = await getConnection();
		const estudianteId=req.params.estudianteId;
		const query = `SELECT et.id, t.nombre, t.descripcion, et.estado_tarea, et.calificacion, et.fecha_envio
        FROM estudiante_tarea et
        INNER JOIN tareas t ON et.tarea_id = t.id
        WHERE et.estudiante_id =?`;
		const [rows] = await connection.execute(query,[estudianteId]);
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

export const getHomeworksByFormedCourseId = async (req, res) => {
	try {
		const connection = await getConnection();
		const cursoFormadoId=req.params.cursoFormadoId;
		const query = `SELECT * FROM tareas WHERE curso_formado_id =?`;
		const [rows] = await connection.execute(query,[cursoFormadoId]);
		if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"Ese curso no existe"});
		}
	} catch (error) {
		console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

export const getTareaBYCursoANDEstudiante = async (req, res) => {
	try {
		const connection = await getConnection();
		const { curso_formado_id, estudiante_id } = req.params;
		const query = `SELECT et.id, t.curso_formado_id, t.nombre, t.descripcion, t.fecha_inicio, t.fecha_fin, tt.tipo, et.estado_tarea, et.entrega, et.calificacion
						FROM tareas t
						JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id
						JOIN estudiante_tarea et ON t.id = et.tarea_id
						WHERE t.curso_formado_id = ?
						AND et.estudiante_id = ?`;
		const [rows] = await connection.execute(query,[curso_formado_id, estudiante_id]);
		if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"Ese curso no existe"});
		}
	} catch (error) {
		console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }

};

export const getTareaBYCursoANDTarea = async (req, res) => {
	try {
		const connection = await getConnection();
		const { curso_formado_id, estudiante_tarea_id } = req.params;
		const query = `SELECT e.id AS estudiante_id, cf.id AS curso_formado_id, et.id AS estudiante_tarea_id, et.estado_tarea, et.entrega, t.fecha_inicio, t.fecha_fin, tt.tipo AS tipo_tarea, t.nombre, t.descripcion
						FROM estudiantes e
						INNER JOIN estudiante_tarea et ON e.id = et.estudiante_id
						INNER JOIN tareas t ON et.tarea_id = t.id
						INNER JOIN cursos_formados cf ON t.curso_formado_id = cf.id
						INNER JOIN tipo_tarea tt ON t.tipo_tarea_id = tt.id
						WHERE cf.id = ?
						AND et.id = ?`;
		const [rows] = await connection.execute(query,[curso_formado_id, estudiante_tarea_id]);
		if(rows.length>0){
			res.json(rows);
		}
		else{
			res.status(404).json({message:"Esa tarea no existe"});
		}
	} catch (error) {
		console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
    }

};