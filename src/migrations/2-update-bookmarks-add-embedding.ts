import {collectionName} from "../domain/bookmarks.domain";
import {CollectionCreateSchema} from "typesense/lib/Typesense/Collections";

export const up = async (context: any) => {
    const ctx = context.context;
    const bookmarksSchema = {
        'fields': [
            {
                'name': 'embedding',
                'type': 'float[]',
                'embed': {
                    'from': [
                        'tags',
                        'keywords'
                    ],
                    'model_config': {
                        'model_name': 'ts/all-MiniLM-L12-v2'
                    }
                }
            }
        ]
    };
    await ctx.client.collections(collectionName).update(bookmarksSchema);
}

export const down = async (context: any) => {
    const ctx = context.context;
    const bookmarksSchema = {
        'fields': [
            {'name': 'embedding', 'drop': true}
        ]
    };
    await ctx.client.collections(collectionName).update(bookmarksSchema);
}