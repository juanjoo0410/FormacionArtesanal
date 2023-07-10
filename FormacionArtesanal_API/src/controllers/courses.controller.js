import { getConnection } from "./../database/database.js";

export const getCourses = async (req, res) => {
	try {
		const connection = await getConnection();
		const { curso } = req.params;
		const query = `SELECT cursos_formados.id, materias.nombre AS materia, cursos.nombre AS curso, hora_inicio, docentes.nombres AS docente
		FROM cursos_formados
		INNER JOIN materias ON cursos_formados.materia_id = materias.id
		INNER JOIN cursos ON cursos_formados.curso_id = cursos.id
		INNER JOIN docentes ON cursos_formados.docente_id = docentes.id
		WHERE cursos.nombre = ?`;
		const [rows] = await connection.execute(query, [curso]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El curso no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};

export const getCoursesByStudentId = async (req, res) => {
	try {
		const connection = await getConnection();
		const { estudiante_id } = req.params;
		const query = `SELECT horarios_formados.id as id, cursos_formados.id as curso_formado_id,cursos.nombre as curso,materias.nombre AS materia
		FROM cursos
		JOIN cursos_formados ON cursos.id = cursos_formados.curso_id
		JOIN horarios_formados ON cursos_formados.id = horarios_formados.curso_formado_id
		JOIN estudiantes ON horarios_formados.estudiante_id = estudiantes.id
		JOIN materias ON cursos_formados.materia_id = materias.id
		WHERE estudiantes.id = ?`;
		const [rows] = await connection.execute(query, [estudiante_id]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El estudiante no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};

export const getCoursesByTeacherId = async (req, res) => {
	try {
		const connection = await getConnection();
		const { docente_id } = req.params;
		const query = `SELECT cursos_formados.id as curso_formado_id,cursos.nombre as curso,materias.nombre AS materia
		FROM cursos
		JOIN cursos_formados ON cursos.id = cursos_formados.curso_id
		JOIN docentes ON cursos_formados.docente_id = docentes.id
		JOIN materias ON cursos_formados.materia_id = materias.id
		WHERE docentes.id = ?`;
		const [rows] = await connection.execute(query, [docente_id]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El profesor no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};

export const getCourseGradingByStudentId = async (req, res) => {
	try {
		const connection = await getConnection();
		const { estudiante_id } = req.params;
		const query = `SELECT cursos.nombre as curso, materias.nombre AS materia,horarios_formados.promedio,horarios_formados.asistencia
		FROM cursos
		JOIN cursos_formados ON cursos.id = cursos_formados.curso_id
		JOIN horarios_formados ON cursos_formados.id = horarios_formados.curso_formado_id
		JOIN estudiantes ON horarios_formados.estudiante_id = estudiantes.id
		JOIN materias ON cursos_formados.materia_id = materias.id
		WHERE estudiantes.id = ?`;
		const [rows] = await connection.execute(query, [estudiante_id]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El estudiante no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};

export const getAsistenciasByHorarioID = async (req, res) => {
	try {
		const connection = await getConnection();
		const { horario_formado_id } = req.params;
		const query = `SELECT horarios_formados.id, horarios_formados.asistencia, horarios_formados.dias_asistidos, horarios_formados.dias_faltas
		FROM horarios_formados
		WHERE horarios_formados.id = ?`;
		const [rows] = await connection.execute(query, [horario_formado_id]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El horario no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};

export const setPromedioByHorarioId = async (req, res) => {
	try {
		const connection = await getConnection();
		const horario_formado_id  = req.body.horario_formado_id;
		const promedio=req.body.promedio;
		const query = `UPDATE pruebas.horarios_formados
						SET promedio = ?
						WHERE id = ?`;
		const [rows] = await connection.execute(query, [promedio,horario_formado_id]);
		if (rows.affectedRows > 0) {
			res.status(200).json({message:"Filas modificadas exitosamente"});
		} else {
			res.status(404).json({ message: "El id del horario formado no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};


export const setAsistenciaByHorarioId = async (req, res) => {
	try {
		const connection = await getConnection();
		const { horario_formado_id, asistencia } = req.body;
		const query = `UPDATE horarios_formados
						SET asistencia = ?
						WHERE id = ?`;
		const [rows] = await connection.execute(query, [
			asistencia,
			horario_formado_id,
		]);
		if (rows.affectedRows > 0) {
			res.status(200).json({message:"Filas modificadas exitosamente"});
		} else {
			res.status(404).json({ message: "El id del horario formado no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};


export const getAllCourses = async (req, res) => {
	try {
		const connection = await getConnection();
		const query = `SELECT cursos_formados.id as id,cursos.nombre as curso,materias.nombre AS materia,CONCAT(docentes.nombres, " ", docentes.apellidos) as docente,cursos_formados.cupo as cupo, cursos_formados.hora_inicio
		FROM cursos_formados
        JOIN cursos ON cursos.id = cursos_formados.curso_id
        JOIN docentes ON cursos_formados.docente_id = docentes.id
        JOIN materias ON cursos_formados.materia_id = materias.id;`;
		const [rows] = await connection.execute(query);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "No hay cursos" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};



export const insertHorarioFormado = async (req, res) => {
	try {
		const connection = await getConnection();
		const query = `SELECT cursos_formados.id as id,cursos.nombre as curso,materias.nombre AS materia,CONCAT(docentes.nombres, " ", docentes.apellidos) as docente,cursos_formados.cupo as cupo 
		FROM cursos_formados
        JOIN cursos ON cursos.id = cursos_formados.curso_id
        JOIN docentes ON cursos_formados.docente_id = docentes.id
        JOIN materias ON cursos_formados.materia_id = materias.id;`;
		const [rows] = await connection.execute(query);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El profesor no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};




export const registerInTheCourse = async (req, res) => {
	try {
		const connection = await getConnection();
		const { estudiante_id,curso_formado_id } = req.body;
		const cupos = await getCuposById(curso_formado_id);
		if(cupos<=0){
			res.status(409).json({message: "El curso ya no tiene cupos disponibles"})
		}
		else{
			const query = `INSERT INTO horarios_formados (estudiante_id,curso_formado_id) VALUES (?, ?)`;
			let [result] = await connection.execute(query, [estudiante_id,curso_formado_id ]);
			await setCupo(cupos-1,curso_formado_id);
			res.json({
				id: result.insertId,
				message: "Estudiante matriculado correctamente"
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Ocurrió un error al crear el estudiante" });
	}
};

const getCuposById= async(id)=>{
	const connection = await getConnection();
	const query = `select cupo from cursos_formados
	where cursos_formados.id=?`;
	const [result] = await connection.execute(query, [id]);
	return result[0].cupo
}

const setCupo= async(cupo,id)=>{
	const connection = await getConnection();
	const query = `UPDATE cursos_formados
	SET cupo = ?
	WHERE id = ?`;
 await connection.execute(query, [cupo,id]);
}

export const getCourseByID = async (req, res) => {
	try {
		const connection = await getConnection();
		const { curso_formado_id } = req.params;
		const query = `SELECT cursos_formados.id as id,cursos.nombre as curso,materias.nombre AS materia,CONCAT(docentes.nombres, " ", docentes.apellidos) as docente, materias.modulo as modulo, cursos_formados.hora_inicio as hora_inicio, cursos_formados.docente_evaluacion as evaluacion_docente
		FROM cursos_formados
        JOIN cursos ON cursos.id = cursos_formados.curso_id
        JOIN docentes ON cursos_formados.docente_id = docentes.id
        JOIN materias ON cursos_formados.materia_id = materias.id
		WHERE cursos_formados.id = ?`;
		const [rows] = await connection.execute(query, [curso_formado_id]);
		if (rows.length > 0) {
			res.json(rows);
		} else {
			res.status(404).json({ message: "El curso no existe" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "ocurrio un error" });
	}
};