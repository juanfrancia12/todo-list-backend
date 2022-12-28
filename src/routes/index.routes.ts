import { Router,Request, Response } from "express";


const router = Router();

// Routes
router.get("/",(_req: Request, res: Response)=>{
  res.status(500).json({ msg: "Bienvenido a la pagina inicial",description:'Gestor de tareas' });
});

export default router;
