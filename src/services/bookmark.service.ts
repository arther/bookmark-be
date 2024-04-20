import { getMongoClient } from "./mongo.service";
import { Bookmarks, bookmarksCollectionName } from "../domain/bookmarks.domain";
import { Request, Response } from "express";

export const saveBookmarks = async (bookmark: Bookmarks) => {
    return getMongoClient().db(process.env.MONGO_DB_NAME)
        .collection(bookmarksCollectionName)
        .insertOne(bookmark);
}

export const searchBookmarks = async (req: Request, res: Response) => {
    console.log("query", req.query);
    const query = {
        $or: [
            { content: { $regex: req.query.key, $options: 'i' }}
        ]
    }

    console.log(`Query`, query)
    const results = await getMongoClient().db().collection(bookmarksCollectionName).find(query).toArray();
    res.json(results);
}