import {Router} from "express";
import healthRouter from "./health.router";

let router = Router();

router.use(healthRouter);
export default router;