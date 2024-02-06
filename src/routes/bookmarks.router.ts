import {Router} from "express";
import {extractText, uploadImg} from "../services/image.service";
import {searchBookmarks} from "../services/bookmark.service";

const bookmarksRouter = Router()

bookmarksRouter.post('/search', searchBookmarks);

export default bookmarksRouter;