import {collectionName} from "../domain/bookmarks.domain";
import {CollectionCreateSchema} from "typesense/lib/Typesense/Collections";

export const up = async (context: any) => {
    const ctx = context.context;
    const bookmarksSchema = {
        'name': collectionName,
        'fields': [
            {'name': 'id', 'type': 'string'},
            {'name': 'book', 'type': 'string', 'facet': true},
            {'name': 'keywords', 'type': 'string[]', 'facet': true},
            {'name': 'bookmark_path', 'type': 'string'},
            {'name': 'authors', 'type': 'string[]', 'facet': true},
            {'name': 'tags', 'type': 'string[]', 'facet': true},
        ]
    } as CollectionCreateSchema;
    await ctx.client.collections().create(bookmarksSchema);
}

export const down = async (context: any) => {
    try {
        const ctx = context.context;
        await ctx.client.collections(collectionName).delete();
    } catch (err) {
        console.error(err);
    }
}