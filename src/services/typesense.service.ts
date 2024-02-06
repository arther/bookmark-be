import Typesense from "typesense";
import {CollectionCreateSchema} from "typesense/lib/Typesense/Collections";
import {collectionName} from "../domain/bookmarks.domain";

export const client = new Typesense.Client({
    'nodes': [{
        'host': 'localhost',
        'port': 8108,
        'protocol': 'http'
    }],
    'apiKey': process.env.TYPESENSE_API_KEY || "",
    'connectionTimeoutSeconds': 2
});

export const createBookmarks = async () => {
    const bookmarksSchema = {
        'name': collectionName,
        'fields': [
            {'name': 'id', 'type': 'string'},
            {'name': 'book', 'type': 'string', 'facet': true},
            {'name': 'keywords', 'type': 'string[]', 'facet': true},
            {'name': 'bookmark_path', 'type': 'string'},
            {'name': 'authors', 'type': 'string[]', 'facet': true}
        ]
    } as CollectionCreateSchema;
    try {
        await client.collections(collectionName).delete();
    } catch (err) {
        console.error(err);
    }
}