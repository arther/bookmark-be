import { Router } from "express";
import healthRouter from "./health.router";
import imageRouter from "./image.router";
import bookmarksRouter from "./bookmarks.router";
import booksRouter from "./books.router";

let router = Router();

router.use(healthRouter);
router.use('/api/v1/image', imageRouter);
router.use('/api/v1/bookmarks', bookmarksRouter);
router.use('/api/v1/books', booksRouter)
export default router;