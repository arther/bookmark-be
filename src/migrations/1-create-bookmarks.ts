import { bookmarksCollectionName } from "../domain/bookmarks.domain";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const up = async (context: any) => {
    const ctx = context.context;
    const bookmarksSchema = {
        'name': bookmarksCollectionName,
        'fields': [
            { 'name': 'id', 'type': 'string' },
            { 'name': 'book', 'type': 'string', 'facet': true },
            { 'name': 'keywords', 'type': 'string[]', 'facet': true },
            { 'name': 'bookmark_path', 'type': 'string' },
            { 'name': 'authors', 'type': 'string[]', 'facet': true },
            { 'name': 'content', 'type': 'string'},
            { 'name': 'tags', 'type': 'string[]', 'facet': true },
            {
                'name': 'embedding',
                'type': 'float[]',
                'embed': {
                    'from': [
                        'content',
                    ],
                    'model_config': {
                        'model_name': 'ts/all-MiniLM-L12-v2'
                    }
                }
            }
        ]
    } as CollectionCreateSchema;
    await ctx.client.collections().create(bookmarksSchema);
}

export const down = async (context: any) => {
    try {
        const ctx = context.context;
        await ctx.client.collections(bookmarksCollectionName).delete();
    } catch (err) {
        console.error(err);
    }
}