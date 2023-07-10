import express from "express";
import router from "./routes/students.routes.js";
import routerLogin from "./routes/login.routes.js";
import routerTeacher from "./routes/teacher.routes.js";
import routerCreatedCourses from "./routes/createdCourses.routes.js";
import routerHomework from "./routes/homework.routes.js";
import cors from "cors";

const app = express();

//Settings
app.set("port", 9000);

//Middelewares
app.use(express.json());
app.use(cors({
    exposedHeaders: ['Authorization', 'Content-Type']
  }));

app.use(router)
app.use(routerLogin)
app.use(routerTeacher)
app.use(routerCreatedCourses)
app.use(routerHomework)

export default app;
