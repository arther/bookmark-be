import {client} from "./typesense.service";
import {Bookmarks, collectionName} from "../domain/bookmarks.domain";

export const saveBookmarks = async (bookmark: Bookmarks) => {
    return client.collections(collectionName).documents().import([bookmark], {
        batch_size: 1,
        return_doc: true,
        return_id: true,
    });
}

export const searchBookmarks = async (query: string) => {

}