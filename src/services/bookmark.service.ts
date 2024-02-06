import {client} from "./typesense.service";
import {Bookmarks, bookmarksCollectionName} from "../domain/bookmarks.domain";
import {Request, Response} from "express";

export const saveBookmarks = async (bookmark: Bookmarks) => {
    return client.collections(bookmarksCollectionName).documents().import([bookmark], {
        batch_size: 1,
        return_doc: true,
        return_id: true,
    });
}

export const searchBookmarks = async (req: Request, res: Response) => {
    console.log("query", req.query);
    const query = {
        q: req.query.key as string,
        query_by: 'embedding, tags, keywords',
        exclude_fields: 'embedding',
        vector_query : 'embedding:([], alpha:0.1, distance_threshold:0.70)',
    }

    console.log(`Query`, query)
    const results = await client.collections(bookmarksCollectionName).documents().search(query);
    res.json(results);
}