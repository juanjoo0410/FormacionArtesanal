import { Router } from "express";
import { getAllCourses, getCourseGradingByStudentId, getCourses, getCoursesByStudentId, getCoursesByTeacherId, registerInTheCourse, setAsistenciaByHorarioId, setPromedioByHorarioId, getCourseByID, getAsistenciasByHorarioID } from "../controllers/courses.controller.js";
const routerCreatedCourses = Router();

routerCreatedCourses.get("/cursos/:curso", getCourses);
routerCreatedCourses.get("/cursosPorEstudiante/:estudiante_id", getCoursesByStudentId);
routerCreatedCourses.get("/notas_del_curso/:estudiante_id", getCourseGradingByStudentId);
routerCreatedCourses.get("/cursosPorDocente/:docente_id", getCoursesByTeacherId);
routerCreatedCourses.post("/curso/editarPromedio",setPromedioByHorarioId);
routerCreatedCourses.post("/curso/editarAsistencia",setAsistenciaByHorarioId);
routerCreatedCourses.get("/curso/AllCursos", getAllCourses);
routerCreatedCourses.post("/matricularse", registerInTheCourse);
routerCreatedCourses.get("/curso/:curso_formado_id", getCourseByID);
routerCreatedCourses.get("/horario/:horario_formado_id/asistencias", getAsistenciasByHorarioID);

export default routerCreatedCourses;


