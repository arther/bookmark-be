export interface Bookmarks {
    id: string,
    book: string,
    keywords: string[],
    bookmark_path: string,
    authors: string[],
    content: string
}

export const collectionName = 'bookmarks';