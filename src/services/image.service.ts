import { createWorker } from 'tesseract.js';
import { Request, Response } from "express";
import multer from "multer";
import { extractKeywords } from "./text.service";
import { v4 as uuidv4 } from 'uuid';
import { saveBookmarks } from "./bookmark.service";
import { Bookmarks } from "../domain/bookmarks.domain";

function cleanUp(text: string) {
    return text.replace(/\n/g, " ");
}

// Todo: optimise the worker utilisation
// Todo: Make this a job queue and process image files async
export const extractText = async (req: Request, res: Response) => {
    if (req.file?.path) {
        const worker = await createWorker('eng');
        const extractedText = await extractTextFromImage(worker, req.file.path);
        const cleanedText = cleanUp(extractedText);
        const bookmarks = createBookmarks(req, cleanedText);
        const savedBookmarks = await saveBookmarks(bookmarks);
        res.status(200).json(savedBookmarks);
        return;
    }

    res.status(200).json({
        message: "Image processing failed. Try later.",
        success: false,
    });
};

const extractTextFromImage = async (worker: Tesseract.Worker, imagePath: string): Promise<string> => {
    const result = await worker.recognize(imagePath || "Nothing");
    await worker.terminate();
    console.log("Text extracted");
    return result.data.text as string;
}

const createBookmarks = (req: Request, content: string): Bookmarks => {
    return {
        id: uuidv4().toString(),
        book: req.body.book as string,
        bookmark_path: req.file?.path || "",
        authors: req.body.authors,
        content: content,
        tags: req.body.tags,
    };
}

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

export const uploadImg = multer({ storage: storageEngine }).single('image');