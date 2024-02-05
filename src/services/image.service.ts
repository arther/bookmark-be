import {createWorker} from 'tesseract.js';
import {Request, Response} from "express";
import multer from "multer";
import {extractKeywords} from "./text.service";
import {v4 as uuidv4} from 'uuid';
import {saveBookmarks} from "./bookmark.service";
import {Bookmarks} from "../domain/bookmarks.domain";

export const extractText = async (req: Request, res: Response) => {
    if (req.file?.path) {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(req.file?.path || "Nothing");
        await worker.terminate();
        let content = ret.data.text as string;
        let keywords1 = extractKeywords(content);
        console.log("Keyworks extracted");
        const bookmarks = {
            id: uuidv4().toString(),
            book: req.body.book as string,
            keywords: keywords1,
            bookmark_path: req.file.path,
            authors: req.body.authors,
            content: content
        } as Bookmarks;
        console.log("Bookmark constructed");
        res.status(200).json(await saveBookmarks(bookmarks));
        console.log("Bookmark saved");
        return;
    }

    res.status(200).json({
        message: "Image processes successfully",
        success: false,
    });
};

let imageStoragePath = process.cwd() + "/images";
console.log(`Image storage path: ${imageStoragePath}`)
const storageEngine = multer.diskStorage({
    destination: imageStoragePath,
    filename: (req: Request,
               file: Express.Multer.File,
               callback: (error: Error | null, filename: string) => void) => {
        console.log("image name", file.originalname);
        callback(null, file.originalname);
    }
});

export const uploadImg = multer({storage: storageEngine}).single('image');