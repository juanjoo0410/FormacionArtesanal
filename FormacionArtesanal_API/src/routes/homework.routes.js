import { Router } from "express";
import { gethomeworkByStudentId, getHomeworksByFormedCourseId, getTareaBYCursoANDEstudiante, getTareaBYCursoANDTarea } from "../controllers/homework.controller.js";
const routerHomework = Router();
routerHomework.get("/tareas/:estudianteId", gethomeworkByStudentId);
routerHomework.get("/tareasDelCurso/:cursoFormadoId", getHomeworksByFormedCourseId);
routerHomework.get("/tareasCursoEstudiante/:curso_formado_id/:estudiante_id", getTareaBYCursoANDEstudiante);
routerHomework.get("/tareasCursoTarea/:curso_formado_id/:estudiante_tarea_id", getTareaBYCursoANDTarea);





export default routerHomework;