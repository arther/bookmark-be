import {client} from "./typesense.service";
import {Bookmarks, bookmarksCollectionName} from "../domain/bookmarks.domain";
import {Request, Response} from "express";
import {SearchParams} from "typesense/lib/Typesense/Documents";

export const saveBookmarks = async (bookmark: Bookmarks) => {
    return client.collections(bookmarksCollectionName).documents().import([bookmark], {
        batch_size: 1,
        return_doc: true,
        return_id: true,
    });
}

export const searchBookmarks = async (req: Request, res: Response) => {
    console.log("query", req.query);
    // const query = {
    //     q: req.query.key as string,
    //     query_by: "embedding, keywords, tags",
    //     exclude_fields: "embedding",
    // }
    const query = {
        q: req.query.key as string,
        query_by: "book, authors, tags",
    }
    console.log(`Query`, query)
    const results = client.collections(bookmarksCollectionName).documents().search(query);
    res.json(results);
}