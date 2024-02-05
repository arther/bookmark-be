import {Router} from "express";
import healthRouter from "./health.router";
import imageRouter from "./image.router";

let router = Router();

router.use(healthRouter);
router.use('/api/v1/image', imageRouter);
export default router;