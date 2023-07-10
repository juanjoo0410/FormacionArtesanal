import { Router } from "express";
import { getCrendentials } from "../controllers/login.controller.js";
const routerLogin = Router();

routerLogin.post("/login", getCrendentials);

export default routerLogin;
