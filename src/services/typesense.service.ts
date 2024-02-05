import Typesense from "typesense";
import {CollectionCreateSchema} from "typesense/lib/Typesense/Collections";
import {collectionName} from "../domain/bookmarks.domain";

export const client = new Typesense.Client({
    'nodes': [{
        'host': 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
        'port': 8108,      // For Typesense Cloud use 443
        'protocol': 'http'   // For Typesense Cloud use https
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
        await client.collections().create(bookmarksSchema);
    } catch (err) {
        console.error(err);
    }
}