import { Router } from "express";
import { extractText, uploadImg } from "../services/image.service";

const imageRouter = Router()

imageRouter.post('/upload', uploadImg, extractText);

export default imageRouter;