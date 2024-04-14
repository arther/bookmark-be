import isbn from 'node-isbn';

export const addBookByIsbn = async (isbnNumber: string) => {
    return await isbn
        .provider([isbn.PROVIDER_NAMES.OPENLIBRARY, isbn.PROVIDER_NAMES.GOOGLE])
        .resolve(isbnNumber);
}