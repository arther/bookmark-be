import {createWorker} from 'tesseract.js';
import {Request, Response} from "express";
import multer from "multer";

export const extractText = async (req: Request, res: Response) => {
    if (req.file?.path) {
        const worker = await createWorker('eng');
        const ret = await worker.recognize(req.file?.path || "Nothing");
        console.log(ret.data.text);
        await worker.terminate();
        res.status(200).json({
            message: "Image processes successfully",
            success: true,
            extractedText: ret.data.text,
        });
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