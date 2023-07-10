import { Router } from "express";
import { getTeacher, insertTeacher } from "../controllers/teacher.controller.js";
const routerTeacher = Router();

routerTeacher.get("/profesores/:id", getTeacher);

routerTeacher.post("/profesores/registrarse",insertTeacher)
export default routerTeacher;