export interface Bookmarks {
    id: string,
    book: string,
    bookmark_path: string,
    authors: string[],
    content: string,
    tags: string[],
}

export const bookmarksCollectionName = 'bookmarks';