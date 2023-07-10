import { Router } from "express";
import { getStudent, insertStudent } from "../controllers/student.controller.js";
const router = Router();

router.get("/estudiantes/:id", getStudent);

router.post("/estudiantes/registrarse",insertStudent);

export default router;



